import jwt from 'jsonwebtoken';

const middlewareObj = {};

middlewareObj.isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'No token provided',
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
      error: 'Failed to authenticate token',
    });
  }
};

export default middlewareObj;
