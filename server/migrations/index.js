import pool from '../config';

(async () => {
  const client = await pool.connect();
  try {
    const incidents = `CREATE TABLE IF NOT EXISTS incidents(id serial PRIMARY KEY, 
    created_on DATE NOT NULL,
    created_by INT NOT NULL,
    type VARCHAR(255) NOT NULL, 
    location VARCHAR(255) NOT NULL, 
    status VARCHAR(255) NOT NULL, 
    images text[],
    videos text[],
    comment VARCHAR(1000));`;
    const results = await client.query(incidents);
    console.log(results.rows);
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
})();

(async () => {
  const client = await pool.connect();
  try {
    const users = `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, 
      firstname VARCHAR(255) NOT NULL, 
      lastname VARCHAR(255) NOT NULL, 
      othername VARCHAR(255), 
      email VARCHAR(255) UNIQUE NOT NULL, 
      username VARCHAR(255) UNIQUE NOT NULL, 
      Phone_number VARCHAR(255) NOT NULL,
      registered DATE, 
      is_Admin BOOLEAN NOT NULL
    );`;
    const results = await client.query(users);
    console.log(results.rows);
  } catch(err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
})();
