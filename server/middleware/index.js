// All middleware  goes here
const middlewareObj = {};

middlewareObj.checkUserInput = (req, res, next) => {
  //  checking if the user's input is valid
  const errors = [];

  if (!req.body.type || req.body.type.toLowerCase() !== 'red-flag') {
    const error = {
      type: "Incident type must be 'red-flag' ",
    };
    errors.push(error);
  }
  if (!req.body.location || req.body.location === '') {
    const error = {
      location: 'Location is required ',
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
};

export default middlewareObj;
