import jwt from 'jsonwebtoken';

// All middleware  goes here
const middlewareObj = {};

middlewareObj.checkSignupInput = (req, res, next) => {
  // checking if the user's input is valid
  let errors = [];
  
  if (!req.body.firstname || req.body.firstname === '') {
    const error = {
      firstname: 'Firstname is required and should not be empty',
    };
    errors.push(error);
  }
  if (!req.body.lastname || req.body.lastname === '') {
    const error = {
      lastname: 'Lastname is required and should not be empty',
    };
    errors.push(error);
  }
  if (!req.body.email || req.body.email === '') {
    const error = {
      email: 'Email is required and should not be empty',
    };
    errors.push(error);
  }
  if (!req.body.password || req.body.password === '') {
    const error = {
      password: 'Password is required and should not be empty',
    };
    errors.push(error);
  }
  if (!req.body.username || req.body.username === '') {
    const error = {
      username: 'Username is required and should not be empty',
    };
    errors.push(error);
  }
  if (!req.body.phoneNumber || req.body.phoneNumber === '') {
    const error = {
      phoneNumber: 'Phone number is required and should not be empty',
    };
    errors.push(error);
  }

  if (errors.length !== 0) {
    return res.status(400).json({
      status: 400,
      error: errors,
    });
  }
  next();
  errors = [];
};

middlewareObj.checkSigninInput = (req, res, next) => {
  const errors = [];
  if (!req.body.email || req.body.email === '') {
    const error = {
      email: 'Email is required and should not be empty',
    };
    errors.push(error);
  }
  if (!req.body.password || req.body.password === '') {
    const error = {
      password: 'Password is required and should not be empty',
    };
    errors.push(error);
  }
  if (errors.length !== 0) {
    return res.status(400).json({
      status: 400,
      error: errors,
    });
  }
  next();
};

middlewareObj.checkUserInput = (req, res, next) => {
  //  checking if the user's input is valid
  let errors = [];

  const geolocation = /^[\d]{1,2}.[\d]{3,6}, [\d]{1,2}.[\d]{3,6}$/.test(req.body.location);

  if (!req.body.type || req.body.type.toLowerCase() !== 'red-flag') {
    const error = {
      type: "Incident type should be 'red-flag' ",
    };
    errors.push(error);
  }
  if (!req.body.location || req.body.location === '') {
    const error = {
      location: 'Location is required ',
    };
    errors.push(error);
  }
  if (!geolocation) {
    const error = {
      location: 'Location should be lat long coordinate eg.(6.605874, 3.349149)',
    };
    errors.push(error);
  }
  if (!req.body.comment || req.body.comment === '') {
    const error = {
      comment: 'Comment is required',
    };
    errors.push(error);
  }

  if (errors.length !== 0) {
    return res.status(400).json({
      status: 400,
      error: errors,
    });
  }
  next();
  errors = [];
};

middlewareObj.validateLocation = (req, res, next) => {
  const coordinateErrors = [];
  const geolocation = /^[\d]{1,2}.[\d]{3,6}, [\d]{1,2}.[\d]{3,6}$/.test(req.body.location);

  if (!geolocation) {
    const error = {
      Location: 'Location should be lat long coordinate eg(6.605874, 3.349149)',
    };
    coordinateErrors.push(error);
  }
  if (coordinateErrors.length > 0) {
    return res.status(400).json({
      status: 400,
      error: coordinateErrors,
    });
  }
  next();
};

middlewareObj.validateComment = (req, res, next) => {
  const errors = [];

  if (!req.body.comment || req.body.comment === '') {
    const error = {
      comment: 'Comment is required',
    };
    errors.push(error);
  }

  if (errors.length !== 0) {
    return res.status(400).json({
      status: 400,
      error: errors,
    });
  }
  next();
};

middlewareObj.isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'No token',
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.id;
    if (decoded) {
      return next();
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'Error occured, wrong token',
    });
  }
};

export default middlewareObj;
