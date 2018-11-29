// requiring express
import express from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const router = express.Router();

// INDEX - displays a list of Red-Flag records
router.get('/red-flags', controllers.getRedFlags);

// SHOW - displays more information about a specific red-flag
router.get('/red-flags/:id', controllers.getSpecificRedFlag);

// CREATE - adds new red-flag record to the DB (data structure)
router.post('/red-flags', middleware.checkUserInput, controllers.createRedFlag);

export default router;
