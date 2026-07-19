'use server'

import { createAdminClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addColor(name: string, hexCode: string) {
  const supabase = await createAdminClient()

  const { data: existing } = await supabase
    .from('colors')
    .select('id')
    .ilike('name', name)
    .single()

  if (existing) {
    return { success: false, error: 'Une couleur avec ce nom existe déjà.' }
  }

  const { data, error } = await supabase
    .from('colors')
    .insert([{ name, hex_code: hexCode }])
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/products/new')
  return { success: true, color: data }
}
