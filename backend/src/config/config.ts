import dotenv from 'dotenv';

dotenv.config();

export const config = {
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
  },
  server: {
    port: process.env.PORT || 5000,
  },
  env: process.env.NODE_ENV || 'development'
};
