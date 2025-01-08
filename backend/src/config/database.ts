import { Pool } from 'pg';
import { config } from './config';
import logger from '../services/logger';

export const pool = new Pool(config.db);

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
});