'use server'

import { createAdminClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createCollection(formData: FormData) {
  const supabase = await createAdminClient()

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const isFeatured = formData.get('is_featured') === 'on'
  
  const bannerFile = formData.get('banner') as File | null

  if (!name) return { success: false, error: "Name is required" }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  let banner_url = null

  if (bannerFile && bannerFile.size > 0) {
    // Try to ensure bucket exists, ignore error if it already exists
    await supabase.storage.createBucket('collections', { public: true })

    const fileExt = bannerFile.name.split('.').pop()
    const fileName = `${slug}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `collection-banners/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('collections')
      .upload(filePath, bannerFile)

    if (!uploadError) {
      const { data: publicUrlData } = supabase.storage
        .from('collections')
        .getPublicUrl(filePath)
      banner_url = publicUrlData.publicUrl
    } else {
      console.error("Banner upload error", uploadError)
    }
  }

  const { data, error } = await supabase
    .from('collections')
    .insert([{ 
      name, 
      slug, 
      description,
      featured: isFeatured,
      banner: banner_url
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating collection:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/collections')
  return { success: true, collection: data }
}

export async function deleteCollection(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('collections').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/collections')
  return { success: true }
}
