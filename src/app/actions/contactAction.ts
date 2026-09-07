'use server';

import { z } from 'zod';
import { sendTelegramNotification } from '@/utils/telegram';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit comporter au moins 2 caractères'),
  phone: z.string().min(6, 'Numéro de téléphone requis'),
  email: z.string().email('Adresse e-mail invalide').optional().or(z.literal('')),
  subject: z.string().min(2, 'Veuillez préciser le sujet'),
  message: z.string().min(5, 'Votre message doit comporter au moins 5 caractères'),
});

export type ContactInput = z.infer<typeof contactSchema>;

export async function sendContactMessageAction(input: ContactInput) {
  try {
    const validated = contactSchema.parse(input);

    const telegramMessage = `📩 <b>NOUVEAU MESSAGE DE CONTACT VIP</b>\n\n` +
      `👤 <b>Nom :</b> ${validated.name}\n` +
      `📞 <b>Téléphone :</b> ${validated.phone}\n` +
      `📧 <b>Email :</b> ${validated.email || 'Non renseigné'}\n` +
      `🏷️ <b>Prestation / Sujet :</b> ${validated.subject}\n\n` +
      `💬 <b>Message :</b>\n${validated.message}\n\n` +
      `⏰ <i>Reçu le ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Algiers' })} (Heure DZ)</i>`;

    // Non-blocking telegram notification
    sendTelegramNotification(telegramMessage).catch((err) => {
      console.error('Contact telegram notification error:', err);
    });

    return { success: true };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.issues[0]?.message || 'Erreur de validation' };
    }
    return { success: false, error: err.message || 'Une erreur est survenue lors de l’envoi du message.' };
  }
}
