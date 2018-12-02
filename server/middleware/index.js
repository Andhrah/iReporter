// All middleware  goes here
const middlewareObj = {};

middlewareObj.checkUserInput = (req, res, next) => {
//  checking if the user's input is valid
  if (!req.body.type || req.body.type.toLowerCase() !== 'red-flag') {
    return res.json({
      status: 400,
      error: 'Incidient type must be \'red-flag\' ',
    });
  } if (!req.body.location || req.body.location === '') {
    return res.json({
      status: 400,
      error: 'Location is required',
    });
  } if (!req.body.comment || req.body.comment === '') {
    return res.json({
      status: 400,
      error: 'comment is required',
    });
  }

  next();
};

export default middlewareObj;
