import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const VERIFY_TOKEN = process.env.VERIFY_TOKEN || '';
export const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || '';
export const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'fbbotuser',
  password: process.env.DB_PASSWORD || 'A3f2lP8h',
  database: process.env.DB_NAME || 'fbbotdb',
};
