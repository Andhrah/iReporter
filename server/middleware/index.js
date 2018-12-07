// All middleware  goes here
const middlewareObj = {};

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

export default middlewareObj;
