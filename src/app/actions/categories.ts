'use server'

import { createAdminClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createCategory(formData: FormData) {
  const supabase = await createAdminClient()

  const name = formData.get('name') as string

  if (!name) return { success: false, error: "Name is required" }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  const { data, error } = await supabase
    .from('categories')
    .insert([{ name, slug }])
    .select()
    .single()

  if (error) {
    console.error('Error creating category:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/categories')
  return { success: true, category: data }
}

export async function deleteCategory(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/categories')
  return { success: true }
}
