import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// --- Security Middleware ---

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https://images.unsplash.com", "https://picsum.photos"],
      "connect-src": ["'self'", "https://sandbox.safaricom.co.ke", "https://api.safaricom.co.ke"],
      "frame-ancestors": ["'self'", "*"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.APP_URL : '*',
  methods: ['GET', 'POST'],
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10kb' }));

// --- M-Pesa Integration Logic ---

const getMpesaToken = async () => {
  const key = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_CONSUMER_SECRET;
  
  if (!key || !secret) {
    throw new Error('M-Pesa credentials not configured. Please add them to your environment variables.');
  }

  const auth = Buffer.from(`${key}:${secret}`).toString('base64');
  const url = process.env.MPESA_ENV === 'production' 
    ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  const response = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` }
  });
  
  if (!response.ok) {
    throw new Error('Failed to authenticate with Safaricom. Check your Consumer Key and Secret.');
  }

  const data = await response.json() as { access_token: string };
  return data.access_token;
};

app.post('/api/mpesa/stk-push', async (req, res) => {
  try {
    const { phoneNumber, amount } = req.body;
    
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return res.status(400).json({ error: 'Valid phone number is required' });
    }
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    let formattedPhone = phoneNumber.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.substring(1);
    }

    if (formattedPhone.length !== 12) {
      return res.status(400).json({ error: 'Invalid Kenyan phone number format' });
    }

    const token = await getMpesaToken();
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const shortcode = process.env.MPESA_SHORTCODE || '174379';
    const passkey = process.env.MPESA_PASSKEY;
    
    if (!passkey) {
      throw new Error('MPESA_PASSKEY is not configured');
    }
    
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    const url = process.env.MPESA_ENV === 'production'
      ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
      : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount),
        PartyA: formattedPhone,
        PartyB: shortcode,
        PhoneNumber: formattedPhone,
        CallBackURL: `${process.env.APP_URL}/api/mpesa/callback`,
        AccountReference: 'NYOTA_FUND',
        TransactionDesc: 'Loan Application Fee'
      })
    });

    const data = await response.json();
    console.log('M-Pesa Response:', data);
    res.json(data);
  } catch (error) {
    console.error('M-Pesa STK Push Error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
});

app.post('/api/mpesa/callback', (req, res) => {
  console.log('M-Pesa Callback Received:', JSON.stringify(req.body, null, 2));
  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

// --- Vite Middleware / Static Serving ---

if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start server locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
