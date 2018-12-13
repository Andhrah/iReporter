import bcrypt from 'bcrypt';
import User from '../../models/user';

export const signup = (req, res) => {
  // create a user
  const {
    firstname,
    lastname,
    othername,
    username,
    email,
    password,
    phoneNumber,
  } = req.body;

  // before signing up a user, check if email and username already exist

  User.findByEmail(email)
    .then((foundUser) => {
      if (foundUser > 0) {
        return res.status(409).json({
          status: 409,
          error: 'Email is already in use',
        });
      }

      // before saving the user in the database
      // modify the password by hashing or turning
      // the password into some string of text that can't be
      // understood
      const newUser = {
        firstname,
        lastname,
        othername,
        email,
        password: bcrypt.hashSync(password, 10),
        username,
        phoneNumber,
      };

      User.register(newUser)
        .then(results => res.status(201).json({
          status: 201,
          data: results,
        }))
        .catch(err => {
          console.log('>>>>>>>>', err);
          res.status(404).json({
            success: 404,
            error: 'Error occured',
          });
        });
    })
    .catch((err) => {
      console.log('>>>>>>>>', err);
      res.status(500).json({
        error: 'Oops! Something went wrong :(',
      });
    });
};
