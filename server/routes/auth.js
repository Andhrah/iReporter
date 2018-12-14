// requiring express
import express from 'express';
import controllers from '../controllers';
// import middleware from '../middleware';

const router = express.Router();

//  Create user
router.post('/signup', controllers.signup);

//  login user
router.post('/login', controllers.login);

export default router;
