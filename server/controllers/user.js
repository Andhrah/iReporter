import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config';
// eslint-disable-next-line no-unused-vars
import userSchema from '../models';

export const signup = async (req, res) => {
  // create a user
  const {
    firstname,
    lastname,
    othername,
    username,
    email,
    phoneNumber,
    isAdmin,
  } = req.body;

  // before we save the user in the database
  // lets modify the password by hashing or turning
  // the password into some string of text that can't be understood
  const password = bcrypt.hashSync(req.body.password, 10);

  // before signing up a user,
  // check if email and username already exist
  const client = await db.connect();
  const findByEmailAndUsername = 'SELECT email, username FROM users WHERE email = $1 OR username = $2';
  const values = [email, username];
  try {
    const response = await client.query(findByEmailAndUsername, values);
    // checking if email already exist
    if (response.rowCount >= 1 && response.rows[0].email === values[0]) {
      return res.status(409).json({
        status: 409,
        error: 'Email is already taken',
      });
    }
    // checking if username already exist
    if (response.rowCount >= 1 && response.rows[0].username === values[1]) {
      return res.status(409).json({
        status: 409,
        error: 'Username is already taken',
      });
    }
    const insertText = `INSERT INTO users (
      firstname, lastname, othername, email, 
      password, username, phone_number, 
      registered, is_admin
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    const userValues = [
      firstname,
      lastname,
      othername,
      email,
      password,
      username,
      phoneNumber,
      new Date().toDateString(),
      // Boolean(true),
      isAdmin,
    ];

    const newUser = await db.query(insertText, userValues);
    //  Use userid Generate token for registered user
    const userToken = jwt.sign({ id: newUser.rows[0].id }, process.env.SECRET_KEY, {
      expiresIn: 86400, // expires in 24 hours
    });

    if (newUser) {
      return res.status(201).json({
        status: 201,
        data: [{
          token: userToken,
          user: newUser.rows,
        }],
      });
    }
  } catch (err) {
    // console.log(err);
    return res.status(500).json({
      status: 500,
      error: 'Error occured while signing you up, Please Try Again',
    });
  } finally {
    client.release();
  }
};

//  User Login
export const login = async (req, res) => {
  // create a user
  const {
    email,
    username,
    password,
  } = req.body;

  // Handle login logic

  // SELECT every thing from users table where email and username = req.body
  const sql = 'SELECT * FROM users where email = $1 OR username = $2';
  const values = [email, username];
  // connect to a postgreSQL server.
  const client = await db.connect();
  try {
    // querying or requesting information from the database
    const response = await client.query(sql, values);

    // Logging in registered user using email or username and password
    let useEmail;
    if (values[0] !== undefined) {
      useEmail = response.rowCount >= 1 && response.rows[0].email === values[0];
    }
    const useUsername = response.rowCount >= 1 && response.rows[0].username === values[1];

    if (useEmail || useUsername) {
      //  Use userid Generate token for loggedIn user
      const userToken = jwt.sign({ id: response.rows[0].id }, process.env.SECRET_KEY, {
        expiresIn: 86400, // expires in 24 hours
      });
      const comparePassword = bcrypt.compareSync(password, response.rows[0].password);
      if (comparePassword) {
        return res.status(200).json({
          status: 200,
          data: [{
            token: userToken,
            user: response.rows,
          }],
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Incorrect Email/Username or Password',
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Incorrect Email/Username or Password',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      error: 'Error occured while logging you in, Please Try Again',
    });
  } finally {
    client.release();
  }
};
