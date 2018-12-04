// All middleware  goes here
const middlewareObj = {};

middlewareObj.checkUserInput = (req, res, next) => {
//  checking if the user's input is valid
  if (!req.body.type || req.body.type.toLowerCase() !== 'red-flag') {
    res.json({
      status: 400,
      error: 'Incidient type must be \'red-flag\' ',
    });
    return;
  } if (!req.body.location || req.body.location === '') {
    res.json({
      status: 400,
      error: 'Location is required',
    });
    return;
  } if (!req.body.comment || req.body.comment === '') {
    res.json({
      status: 400,
      error: 'comment is required',
    });
    return;
  }

  next();
};

export default middlewareObj;
