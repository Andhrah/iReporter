
import db from '../config';

export const userSchema = (async () => {
  try {
    await db.connect((err, client, release) => {
      // connect to a postgreSQL server and if any error while connecting log it.
      if (err) {
        return console.log('Could not connect to the server, check your internet connection');
      }
      const user = `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, 
        firstname VARCHAR(255) NOT NULL, 
        lastname VARCHAR(255) NOT NULL, 
        othername VARCHAR(255), 
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL, 
        phone_number VARCHAR(255) UNIQUE NOT NULL,
        registered DATE, 
        is_admin BOOLEAN NOT NULL
      );`;
      client.query(user, (error, response) => {
        if (error) {
          console.error('Error creating users table', error);
        }
        console.log('user table >>>', response.rows);
      });
      release();
    });
  } catch (err) {
    console.log('userSchema >>>', err);
  }
})();
