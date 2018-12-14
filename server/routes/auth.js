// requiring express
import express from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const router = express.Router();

//  Create user
router.post('/auth/signup', middleware.checkSignupInput, controllers.signup);

//  login user
router.post('/auth/login', middleware.checkSigninInput, controllers.login);

export default router;
