import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const VERIFY_TOKEN = process.env.VERIFY_TOKEN || '';
export const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || '';
export const NGROK_AUTHTOKEN = process.env.NGROK_AUTHTOKEN || '';
export const APP_SECRET = process.env.APP_SECRET || '';
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
export const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || '';
export const SENDGRID_SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL || '';
export const FB_URL_PROFILE = process.env.FB_URL_PROFILE || 'https://graph.facebook.com/';
export const FB_URL_MESSENGER = process.env.FB_URL_MESSENGER || 'https://graph.facebook.com/v12.0/me/messages';
export const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'fbbotuser',
  password: process.env.DB_PASSWORD || 'A3f2lP8h',
  database: process.env.DB_NAME || 'fbbotdb',
};
