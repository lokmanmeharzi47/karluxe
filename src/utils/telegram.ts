import https from 'https';

export const sendTelegramNotification = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.warn('Telegram BOT_TOKEN or CHAT_ID is not configured');
      return resolve(false);
    }

    const payload = JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    });

    const req = https.request({
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${token}/sendMessage`,
      method: 'POST',
      family: 4, // Force IPv4 to prevent timeouts on networks that drop IPv6 packets
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (!response.ok) {
            console.error('Failed to send telegram message:', response.description);
            return resolve(false);
          }
          resolve(true);
        } catch (e) {
          console.error('Failed to parse telegram response:', data);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Error sending telegram message:', error);
      resolve(false);
    });

    req.write(payload);
    req.end();
  });
};
