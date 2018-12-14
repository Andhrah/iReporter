import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../config';

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
    const results = await db.query(sql, values);
    if (results.rowCount >= 1) {
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
      email,
      password,
      username,
      phoneNumber,
      new Date(),
      false,
    ];

    const userCreated = await db.query(sql2, userValues);
    const userToken = jwt.sign({ id: userCreated.rows[0].id }, process.env.SECRET_KEY, {
      expiresIn: 86400, // expires in 24 hours
    });

    if (userCreated) {
      return res.status(201).json({
        status: 201,
        data: [{
          token: userToken,
          user: userCreated.rows,
        }],
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      error: 'Error occured',
    });
  }
};


//  User Login
export const login = async (req, res) => {
  // create a user
  const {
    email,
    password,
  } = req.body;

  const sql = 'SELECT * FROM users where email = $1';
  const values = [`${email}`];
  try {
    const users = await db.query(sql, values);
    if (users.rowCount >= 1) {
      const userToken = jwt.sign({ id: users.rows[0].id }, process.env.SECRET_KEY, {
        expiresIn: 86400, // expires in 24 hours
      });
      const comparePassword = bcrypt.compareSync(password, users.rows[0].password);
      if (comparePassword) {
        return res.status(200).json({
          status: 200,
          data: [{
            token: userToken,
            user: users.rows,
          }],
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Wrong credential!',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User not found',
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'Error occured',
    });
  }
};
