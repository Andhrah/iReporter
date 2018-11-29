// requiring express
import express from 'express';
import controllers from '../controllers';

const router = express.Router();

// INDEX - displays a list of Red-Flag records
router.get('/red-flags', controllers.getRedFlags);

// SHOW - displays more information about a specific red-flag
router.get('/red-flags/:id', controllers.getSpecificRedFlag);

export default router;
