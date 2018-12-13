// requiring express
import express from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const router = express.Router();

router.post('/signup', controllers.signup);

export default router;
