// requiring express
import express from 'express';
import controllers from '../controllers';
// import middleware from '../middleware';

const router = express.Router();

router.post('/auth/signup', controllers.signup);

router.post('/auth/login', controllers.login);

export default router;
