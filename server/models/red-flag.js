import db from '../config';

export const redFlagSchema = (async () => {
  try {
    // connect to a postgreSQL server and if any error while connecting log it.
    await db.connect((err, client, release) => {
      if (err) {
        return console.log('Could not connect to the server, check your internet connection');
      }
      const redFlag = `CREATE TABLE IF NOT EXISTS red_flags(id serial PRIMARY KEY, 
        created_on DATE NOT NULL,
        created_by INT NOT NULL,
        corruption_methods text[] NOT NULL,
        entity_involved text[] NOT NULL,
        location VARCHAR(255) NOT NULL,
        corruption_date DATE NOT NULL,
        names_involved text[] NOT NULL,
        status VARCHAR(255) NOT NULL, 
        images text[],
        videos text[],
        comment VARCHAR(1000));`;
      client.query(redFlag, (error, response) => {
        if (error) {
          return console.log('Error creating red-flag table', error);
        }
        console.log('red-flag table >>>', response.rows);
        release();
      });
    });
  } catch (err) {
    console.log('redFlagSchema >>>', err);
  }
})();

// const findByIdAndEditLocation = async (id, location) => {
//   let errors;
//   let response;
//   const client = await pool.connect();

//   const sql = 'UPDATE red-flags SET location = $1 WHERE id = $2 RETURNING *';
//   const values = [location, id];
//   try {
//     return await client.query(sql, values).then(results => {
//       response = results.rows;
//     });
//   } catch (err) {
//     errors = new Error(err);
//   } finally {
//     const promise = new Promise((resolve, reject) => {
//       resolve(response);
//       reject(errors);
//     });

//     client.release();
//     return promise;
//   }
// };

// const findByIdAndEditComment = async (id, comment) => {
//   let errors;
//   let response;
//   const client = await pool.connect();

//   const sql = 'UPDATE red_flags SET comment = $1 WHERE id = $2 RETURNING *';
//   const values = [comment, id];
//   try {
//     return await client.query(sql, values).then(results => {
//       response = results.rows;
//     });
//   } catch (err) {
//     errors = new Error(err);
//   } finally {
//     const myPromise = new Promise((resolve, reject) => {
//       resolve(response);
//       reject(errors);
//     });

//     client.release();
//     return myPromise;
//   }
// };

// const findByIdAndDelete = async id => {
//   let errors;
//   let response;
//   const client = await pool.connect();

//   const sql = 'DELETE FROM red_flags WHERE id = $1 RETURNING *';
//   const values = [id];
//   try {
//     return await client.query(sql, values).then(results => {
//       response = results.rows;
//     });
//   } catch (e) {
//     errors = new Error(e);
//   } finally {
//     const myPromise = new Promise((resolve, reject) => {
//       resolve(response);
//       reject(errors);
//     });

//     client.release();
//     return myPromise;
//   }
// };

// export default {
//   createRedFlag,
//   findAll,
//   findById,
//   findByIdAndEditLocation,
//   findByIdAndEditComment,
//   findByIdAndDelete,
// };
