// All middleware  goes here
const middlewareObj = {};

middlewareObj.checkSignupInput = (req, res, next) => {
  // checking if the user's input is valid
  const errors = [];

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
};

middlewareObj.checkSigninInput = (req, res, next) => {
  const errors = [];
  // login user either with email or username and password
  const useEmail = !req.body.email && req.body.email === '';
  const useUsername = !req.body.username && req.body.username === '';

  if (useEmail || useUsername) {
    const error = {
      email: 'Email/Username is required and should not be empty',
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

middlewareObj.checkRedFlagInput = (req, res, next) => {
  //  checking if the user's input is valid
  let errors = [];

  const geolocation = /^[\d]{1,2}.[\d]{3,6}, [\d]{1,2}.[\d]{3,6}$/.test(req.body.location);
  if (!req.body.corruptionMethods || req.body.corruptionMethods === '') {
    const error = {
      corruption_methods: 'Corruption methods is required and should not be empty',
    };
    errors.push(error);
  }
  if (!req.body.entityInvolved || req.body.entityInvolved === '') {
    const error = {
      entity_involved: 'Entity Involved is required and should not be empty',
    };
    errors.push(error);
  }
  if (!req.body.location || req.body.location === '' || !geolocation) {
    const error = {
      location: 'Location is required and should be lat long coordinate eg.(6.605874, 3.349149)',
    };
    errors.push(error);
  }
  if (!req.body.corruptionDate || req.body.corruptionDate === '') {
    const error = {
      corruption_date: 'Date of corruption is required and should not be empty',
    };
    errors.push(error);
  }
  if (!req.body.namesInvolved || req.body.namesInvolved === '') {
    const error = {
      names_involved: 'Names of those Involved is required and should not be empty',
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

middlewareObj.checkInterventionInput = (req, res, next) => {
  //  checking if the user's input is valid
  let errors = [];

  const geolocation = /^[\d]{1,2}.[\d]{3,6}, [\d]{1,2}.[\d]{3,6}$/.test(req.body.location);
  if (!req.body.interventionReasons || req.body.interventionReasons === '') {
    const error = {
      reasons: 'Intervention reason(s) is required and should not be empty',
    };
    errors.push(error);
  }
  if (!req.body.location || req.body.location === '' || !geolocation) {
    const error = {
      location: 'Location is required and should be lat long coordinate eg.(6.605874, 3.349149)',
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

middlewareObj.validateStatus = (req, res, next) => {
  const errors = [];

  if (!req.body.status || req.body.status === '') {
    const error = {
      status: 'Status should not be empty',
    };
    errors.push(error);
  }

  if (req.body.status !== 'Draft' || req.body.status !== 'Resolved' || req.body.status !== 'Under Investigation' || req.body.status !== 'Rejected') {
    const error = {
      status: 'Status can only be updated to either "Draft", "Resolved", "Under Investigation" or "Rejected"',
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

export default middlewareObj;
