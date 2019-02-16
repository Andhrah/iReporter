import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

// Pool is needed for multiple clients
const getConnectionString = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.DEV_DATABASE_URL;
  // this is for development environment
  }
  if (process.env.NODE_ENV === 'test') {
    return process.env.TEST_DATABASE_URL;
    // this is for test environment
  }
  return process.env.DATABASE_URL;
  // this is for production environment
};

const db = new Pool({
  connectionString: getConnectionString(),
});

export default db;
