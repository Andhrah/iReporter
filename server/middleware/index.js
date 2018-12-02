// All middleware  goes here
const middlewareObj = {};

middlewareObj.checkUserInput = (req, res, next) => {
  console.log('I\'m a middleware');
  if (!req.body.type || req.body.type.toLowerCase() !== 'red-flag') {
    console.log('I\'m also a middleware, I just started working');
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
