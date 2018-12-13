// import pool from '../config';

// const findByEmail = async email => {
//   let errors;
//   let response;
//   const db = await pool.connect();

//   const sql = 'SELECT email, username FROM users where email = $1';
//   const values = [email];
//   try {
//     return await db.query(sql, values).then(results => {
//       response = results.rows;
//     });
//   } catch (e) {
//     errors = new Error(e);
//   } finally {
//     const promise = new Promise((resolve, reject) => {
//       resolve(response);
//       reject(errors);
//     });

//     db.release();
//     return promise;
//   }
// };

// const findById = async id => {
//   let errors; let response;
//   const db = await pool.connect();

//   const sql = 'SELECT * FROM users WHERE id = $1';
//   const values = [id];
//   try {
//     return await db.query(sql, values).then(results => {
//       response = results.rows;
//     });
//   } catch (e) {
//     errors = new Error(e);
//   } finally {
//     const promise = new Promise((resolve, reject) => {
//       resolve(response);
//       reject(errors);
//     });

//     db.release();
//     return promise;
//   }
// };
// const register = async userObject => {
//   const {
//     firstname,
//     lastname,
//     othername,
//     email,
//     password,
//     username,
//     phoneNumber,
//   } = userObject;
//   let errors; let response;
//   const db = await pool.connect();

//   const sql =
//     'INSERT INTO users (firstname, lastname, othername, email, password, username, phone_number, registered, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
//   const values = [
//     firstname,
//     lastname,
//     othername,
//     email,
//     password,
//     username,
//     phoneNumber,
//     new Date(),
//     false,
//   ];
//   try {
//     return await db.query(sql, values).then(results => {
//       response = results.rows;
//     });
//   } catch (err) {
//     errors = new Error(err);
//   } finally {
//     const promise = new Promise((resolve, reject) => {
//       resolve(response);
//       reject(errors);
//     });

//     db.release();
//     return promise;
//   }
// };

// export { findByEmail, findById, register };
