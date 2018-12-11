import { Pool } from 'pg';

const getConnectionString = () => {
  if (process.env.NODE_ENV ==='development') {
    return process.env.DEV_DATABASE_URL;
  }
  if (process.env.NODE_ENV === 'test') {
    return process.env.DEV_DATABASE_URL;
  }
  return process.env.DATABASE_URL;
};

const connectionString = {
  connectionString: getConnectionString(),
};

const pool = new Pool(connectionString);

export default pool;
