// requiring express
import express from 'express';
import controllers from '../controllers';
import authenticate from '../middleware/auth';
import middleware from '../middleware/validate';

const router = express.Router();

// INDEX - displays a list of Red-Flag records
router.get('/red-flags',
  authenticate.isLoggedIn,
  controllers.getAllRedFlags);

// SHOW - displays more information about a specific red-flag
router.get('/red-flags/:id',
  authenticate.isLoggedIn,
  controllers.getSpecificRedFlag);

// CREATE - adds new red-flag record to the DB (data structure)
router.post('/red-flags',
  authenticate.isLoggedIn,
  middleware.checkRedFlagInput,
  controllers.createRedFlag);

// EDIT - for editing a particular red-flag location
router.patch('/red-flags/:id/location',
  authenticate.isLoggedIn,
  middleware.validateLocation,
  controllers.editRedFlagLocation);

// EDIT - for editing a particular red-flag record's comment
router.patch('/red-flags/:id/comment',
  authenticate.isLoggedIn,
  middleware.validateComment,
  controllers.editRedFlagComment);

// DELETE - for deleting a red-flag
router.delete('/red-flags/:id',
  authenticate.isLoggedIn,
  controllers.deleteRedFlag);

export default router;
