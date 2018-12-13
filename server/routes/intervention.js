// requiring express
import express from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const router = express.Router();


// CREATE - adds new red-flag record to the DB (data structure)
router.post('/intervention', controllers.createIntervention);

export default router;
