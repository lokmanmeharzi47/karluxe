"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfileInfoAction(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: "Non autorisé" };
  }

  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;
  const phone = formData.get('phone') as string;
  const fullName = `${firstName} ${lastName}`.trim();

  const { error } = await supabase
    .from('profiles')
    .update({ 
      full_name: fullName,
      phone: phone
    })
    .eq('id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/profile');
  return { success: true };
}

export async function updatePasswordAction(formData: FormData) {
  const supabase = await createClient();
  
  const currentPassword = formData.get('current_password') as string;
  const newPassword = formData.get('new_password') as string;
  const confirmPassword = formData.get('confirm_password') as string;

  if (newPassword !== confirmPassword) {
    return { error: "Les mots de passe ne correspondent pas" };
  }

  if (newPassword.length < 6) {
    return { error: "Le mot de passe doit comporter au moins 6 caractères" };
  }

  // To update password, we don't strictly need current password with Supabase 
  // if they are already logged in (updateUser works without old password on server/client).
  // But we can just call updateUser.
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function getProfileAction() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('profiles')
    .select('full_name, email, phone, admin_role')
    .eq('id', user.id)
    .single();

  return data;
}
