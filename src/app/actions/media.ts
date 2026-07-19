'use server'

import { createAdminClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getMediaFiles(bucket?: string) {
  const supabase = await createAdminClient()
  
  let query = supabase.from('media_library').select('*').order('created_at', { ascending: false });
  
  if (bucket && bucket !== 'all') {
    query = query.eq('bucket', bucket);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching media:', error);
    return [];
  }
  return data;
}

export async function uploadMediaAction(formData: FormData) {
  const supabase = await createAdminClient();
  
  const file = formData.get('file') as File;
  const bucket = formData.get('bucket') as string || 'public_assets';
  const folder = formData.get('folder') as string || '';

  if (!file) return { success: false, error: 'No file provided' };

  // Generate a clean filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  // 1. Upload to Supabase Storage
  const { error: uploadError, data: uploadData } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    console.error('Storage Upload Error:', uploadError);
    return { success: false, error: uploadError.message };
  }

  // 2. Insert into media_library tracking table
  const { error: dbError } = await supabase
    .from('media_library')
    .insert([{
      file_name: file.name,
      file_path: uploadData.path,
      bucket: bucket,
      mime_type: file.type,
      size: file.size,
      folder: folder || null
    }]);

  if (dbError) {
    console.error('DB Insert Error:', dbError);
    return { success: false, error: dbError.message };
  }

  revalidatePath('/admin/media');
  return { success: true };
}

export async function deleteMediaAction(id: string, bucket: string, path: string) {
  const supabase = await createAdminClient();

  // 1. Delete from Storage
  const { error: storageError } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (storageError) {
    console.error('Storage Delete Error:', storageError);
    return { success: false, error: storageError.message };
  }

  // 2. Delete from media_library table
  const { error: dbError } = await supabase
    .from('media_library')
    .delete()
    .eq('id', id);

  if (dbError) {
    console.error('DB Delete Error:', dbError);
    return { success: false, error: dbError.message };
  }

  revalidatePath('/admin/media');
  return { success: true };
}
