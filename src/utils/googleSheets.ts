export const appendToAgentSheet = async (agentName: string, bookingData: any) => {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    console.warn('Google Apps Script URL is missing');
    return false;
  }

  const safeAgentName = agentName ? agentName.substring(0, 100) : 'Unassigned';

  try {
    const payload = {
      agentName: safeAgentName,
      bookingData: {
        'Date de Réservation': new Date().toLocaleString('fr-FR'),
        'Nom du Client': bookingData.customerName,
        'Téléphone': bookingData.customerPhone,
        'Véhicule': bookingData.carTitle,
        'Date de Prise en Charge': bookingData.pickupDate,
        'Date de Retour': bookingData.dropoffDate,
        'Lieu': bookingData.location,
        'Prix Total (DA)': bookingData.totalPrice,
        'URL Photo': bookingData.carPhotoUrl || 'N/A'
      }
    };

    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Failed to send data to Google Apps Script:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error writing to Google Sheets via Apps Script:', error);
    return false;
  }
};
