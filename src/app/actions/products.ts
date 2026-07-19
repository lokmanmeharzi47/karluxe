'use server'

import { createAdminClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProduct(formData: FormData) {
  const supabase = await createAdminClient()

  // Extract form fields
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = formData.get('price_da') as string
  const sku = formData.get('sku') as string
  const stock = formData.get('stock') as string
  const category_id = formData.get('category_id') as string
  const collection_id = formData.get('collection_id') as string
  const status = formData.get('status') as string

  // Handle arrays for checkboxes
  const sizeIds = formData.getAll('sizes') as string[]
  const colorIds = formData.getAll('colors') as string[]

  // Handle files
  const files = formData.getAll('images') as File[]

  // Insert product
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert([
      {
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        description,
        price: parseFloat(price) || 0,
        sku,
        status: status === 'Publié' ? 'published' : 'draft',
        category_id: category_id || null,
        collection_id: collection_id || null,
      }
    ])
    .select()
    .single()

  if (productError) {
    console.error('Error creating product:', productError)
    return { success: false, error: productError.message }
  }

  // Upload images
  const imageUrls = []
  if (files && files.length > 0) {
    // Try to ensure bucket exists, ignore error if it already exists
    await supabase.storage.createBucket('products', { public: true })

    for (const file of files) {
      if (file.size === 0) continue

      const fileExt = file.name.split('.').pop()
      const fileName = `${product.id}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `product-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Error uploading image:', uploadError)
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from('products')
        .getPublicUrl(filePath)
        
      imageUrls.push(publicUrlData.publicUrl)
    }

    // Insert image URLs to product_images
    if (imageUrls.length > 0) {
      const imageInserts = imageUrls.map((url, index) => ({
        product_id: product.id,
        image_url: url,
        sort_order: index
      }))

      await supabase.from('product_images').insert(imageInserts)
      
      // Update cover image on product
      await supabase.from('products').update({ cover_image: imageUrls[0] }).eq('id', product.id)
    }
  }

  // Insert inventory variants based on sizes and colors
  if (sizeIds.length > 0 || colorIds.length > 0) {
    const totalStock = parseInt(stock) || 0;
    
    // Create permutations of sizes and colors
    const sizes = sizeIds.length > 0 ? sizeIds : [null];
    const colors = colorIds.length > 0 ? colorIds : [null];
    
    const permutations = [];
    for (const size of sizes) {
      for (const color of colors) {
        permutations.push({ size, color });
      }
    }
    
    // Distribute stock equally among permutations
    const stockPerVariant = Math.floor(totalStock / permutations.length);
    
    for (let i = 0; i < permutations.length; i++) {
      const p = permutations[i];
      const variantSku = `${sku || product.id.substring(0, 8)}-${i+1}`;
      
      const { data: variant } = await supabase
        .from('product_variants')
        .insert([{ 
          product_id: product.id, 
          stock: stockPerVariant, 
          sku: variantSku,
          size_id: p.size,
          color_id: p.color
        }])
        .select()
        .single()
        
      if (variant) {
        await supabase.from('inventory_movements').insert([{
          product_variant_id: variant.id,
          quantity: stockPerVariant,
          type: 'IN',
          reason: 'Initial stock',
          created_by: null // Would be admin user ID in real app
        }]);
      }
    }
  } else if (stock) {
    // Fallback: Create a single default variant if no size/color selected
    const { data: variant } = await supabase
      .from('product_variants')
      .insert([{ product_id: product.id, stock: parseInt(stock) || 0, sku: sku }])
      .select()
      .single()
      
    if (variant) {
      await supabase.from('inventory_movements').insert([{
        product_variant_id: variant.id,
        quantity: parseInt(stock) || 0,
        type: 'IN',
        reason: 'Initial stock',
        created_by: null
      }])
    }
  }

  revalidatePath('/admin/products')
  return { success: true, productId: product.id }
}

export async function deleteProduct(id: string) {
  const supabase = await createAdminClient()

  try {
    // 1. Fetch images to delete from storage
    const { data: images } = await supabase
      .from('product_images')
      .select('image_url')
      .eq('product_id', id)

    if (images && images.length > 0) {
      const pathsToDelete = images.map(img => {
        // Extract the path after the bucket name
        // Usually something like: https://.../storage/v1/object/public/products/product-images/123.jpg
        const urlParts = img.image_url.split('/products/')
        return urlParts.length > 1 ? urlParts[1] : null
      }).filter(Boolean) as string[]

      if (pathsToDelete.length > 0) {
        await supabase.storage.from('products').remove(pathsToDelete)
      }
    }

    // 2. Fetch variants to delete inventory movements
    const { data: variants } = await supabase
      .from('product_variants')
      .select('id')
      .eq('product_id', id)

    if (variants && variants.length > 0) {
      const variantIds = variants.map(v => v.id)
      await supabase.from('inventory_movements').delete().in('product_variant_id', variantIds)
    }

    // 3. Delete variants
    await supabase.from('product_variants').delete().eq('product_id', id)

    // 4. Delete images from DB
    await supabase.from('product_images').delete().eq('product_id', id)

    // 5. Delete the product itself
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      throw error
    }

    revalidatePath('/admin/products')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting product:', error)
    return { success: false, error: error.message || 'Failed to delete product' }
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createAdminClient()

  // Extract form fields
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = formData.get('price_da') as string
  const sku = formData.get('sku') as string
  const stock = formData.get('stock') as string
  const category_id = formData.get('category_id') as string
  const collection_id = formData.get('collection_id') as string
  const status = formData.get('status') as string

  const sizeIds = formData.getAll('sizes') as string[]
  const colorIds = formData.getAll('colors') as string[]
  const files = formData.getAll('images') as File[]

  // Update product
  const { data: product, error: productError } = await supabase
    .from('products')
    .update({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      description,
      price: parseFloat(price) || 0,
      sku,
      status: status === 'Publié' ? 'published' : (status === 'Archivé' ? 'archived' : 'draft'),
      category_id: category_id || null,
      collection_id: collection_id || null,
    })
    .eq('id', id)
    .select()
    .single()

  if (productError) {
    console.error('Error updating product:', productError)
    return { success: false, error: productError.message }
  }

  // Upload NEW images
  const imageUrls = []
  if (files && files.length > 0) {
    for (const file of files) {
      if (file.size === 0) continue

      const fileExt = file.name.split('.').pop()
      const fileName = `${product.id}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `product-images/${fileName}`

      const { error: uploadError } = await supabase.storage.from('products').upload(filePath, file)
      if (uploadError) continue

      const { data: publicUrlData } = supabase.storage.from('products').getPublicUrl(filePath)
      imageUrls.push(publicUrlData.publicUrl)
    }

    if (imageUrls.length > 0) {
      // Get current max sort_order
      const { data: existingImages } = await supabase.from('product_images').select('sort_order').eq('product_id', id).order('sort_order', { ascending: false }).limit(1)
      const startSort = existingImages && existingImages.length > 0 ? (existingImages[0].sort_order || 0) + 1 : 0

      const imageInserts = imageUrls.map((url, index) => ({
        product_id: product.id,
        image_url: url,
        sort_order: startSort + index
      }))

      await supabase.from('product_images').insert(imageInserts)
      
      // If no cover image yet, set it
      if (!product.cover_image) {
        await supabase.from('products').update({ cover_image: imageUrls[0] }).eq('id', product.id)
      }
    }
  }

  // Update variants
  // For MVP: Delete existing variants and recreate them based on new selections
  const { data: oldVariants } = await supabase.from('product_variants').select('id').eq('product_id', id)
  if (oldVariants && oldVariants.length > 0) {
    const oldVariantIds = oldVariants.map(v => v.id)
    await supabase.from('inventory_movements').delete().in('product_variant_id', oldVariantIds)
    await supabase.from('product_variants').delete().in('id', oldVariantIds)
  }

  if (sizeIds.length > 0 || colorIds.length > 0) {
    const totalStock = parseInt(stock) || 0;
    const sizes = sizeIds.length > 0 ? sizeIds : [null];
    const colors = colorIds.length > 0 ? colorIds : [null];
    const permutations = [];
    for (const size of sizes) {
      for (const color of colors) {
        permutations.push({ size, color });
      }
    }
    const stockPerVariant = Math.floor(totalStock / permutations.length);
    for (let i = 0; i < permutations.length; i++) {
      const p = permutations[i];
      const variantSku = `${sku || product.id.substring(0, 8)}-${i+1}`;
      
      const { data: variant } = await supabase.from('product_variants').insert([{ 
        product_id: product.id, stock: stockPerVariant, sku: variantSku, size_id: p.size, color_id: p.color
      }]).select().single()
        
      if (variant) {
        await supabase.from('inventory_movements').insert([{
          product_variant_id: variant.id, quantity: stockPerVariant, type: 'IN', reason: 'Stock adjustment', created_by: null
        }]);
      }
    }
  } else if (stock) {
    const { data: variant } = await supabase.from('product_variants').insert([{ product_id: product.id, stock: parseInt(stock) || 0, sku: sku }]).select().single()
    if (variant) {
      await supabase.from('inventory_movements').insert([{
        product_variant_id: variant.id, quantity: parseInt(stock) || 0, type: 'IN', reason: 'Stock adjustment', created_by: null
      }])
    }
  }

  revalidatePath('/admin/products')
  return { success: true, productId: product.id }
}
