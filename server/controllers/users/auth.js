import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../config';
// import { findByEmail, findById, register } from '../../models/user';

export const signup = async (req, res) => {
  // create a user
  const {
    firstname,
    lastname,
    othername,
    username,
    email,
    phoneNumber,
  } = req.body;

  const password = bcrypt.hashSync(req.body.password, 10);

  // before signing up a user, check if email and username already exist

  const sql = 'SELECT email FROM users where email = $1';
  const values = [email];
  try {
    const results = await pool.query(sql, values);
    if (results.rowCount > 0) {
      return res.status(409).json({
        status: 409,
        error: 'Email or username is already in use',
      });
    }
    const sql2 = 'INSERT INTO users (firstname, lastname, othername, email, password, username, phone_number, registered, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const userValues = [
      firstname,
      lastname,
      othername,
      username,
      email,
      password,
      phoneNumber,
      new Date(),
      false,
    ];

    const userCreated = await pool.query(sql2, userValues);
    
    const userToken = jwt.sign({ id: userCreated.rows[0].id }, process.env.SECRET_KEY, {
      expiresIn: 86400, // expires in 24 hours
    });

    if (userCreated) {
      return res.status(201).json({
        status: 201,
        message: 'user created',
        data: userCreated.rows,
        token: userToken,
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: 500,
      error: 'Error occured',
    });
  }
};

export const login = async (req, res) => {
  // create a user
  const {
    emaill,
    password,
  } = req.body;

  const sql3 = 'SELECT email FROM users where email = $1';
  const values = [emaill];
  try {
    const userss = await pool.query(sql3, values);
    console.log(userss)
    if (user) {
      console.log('==========================')
      console.log(user.rows[0].password);
      console.log(password);
      const comparePassword = bcrypt.compareSync(req.body.password, user.rows[0].password);
      if (comparePassword) {
        return res.status(200).json({
          status: 200,
          message: 'You have successfully login!',
          data: user,
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Wrong credential!',
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      error: 'Error occured',
    });
  }
};

// before signing up a user, check if email and username already exist

//   const sql = 'SELECT email FROM users where email = $1';
//   const values = [email];
//   try {
//     const results = await pool.query(sql, values);
//     if (results.rowCount > 0) {
//       return res.status(409).json({
//         status: 409,
//         error: 'Email or username is already in use',
//       });
//     }
//     const sql2 = 'INSERT INTO users (firstname, lastname, othername, email, password, username, phone_number, registered, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
//     const userValues = [firstname,
//       lastname,
//       othername,
//       username,
//       email,
//       password,
//       phoneNumber,
//       new Date(),
//       false];
//     const userCreated = await pool.query(sql2, userValues);
//     if (userCreated) {
//       return res.status(201).json({
//         status: 201,
//         message: 'user created',
//         data: userCreated.rows,
//       });
//     }
//   } catch (e) {
//     return res.status(500).json({
//       status: 500,
//       error: 'Error occured',
//     });
//   }
// };
// }
//   // before saving the user in the database
//   // modify the password by hashing or turning
//   // the password into some string of text that can't be
//   // understood
//   const newUser = {
//     firstname,
//     lastname,
//     othername,
//     email,
//     password: bcrypt.hashSync(password, 10),
//     username,
//     phoneNumber,
//   };

//   register(newUser)
//     .then(results => res.status(201).json({
//       status: 201,
//       data: results,
//     }))
//     .catch(err => {
//       console.log('>>>>>>>>', err);
//       res.status(404).json({
//         success: 404,
//         error: 'Error occured',
//       });
//     });
// })
//     .catch ((err) => {
//   console.log('>>>>>>>>', err);
//   res.status(500).json({
//     error: 'Oops! Something went wrong :(',
//   });
// });
// };
