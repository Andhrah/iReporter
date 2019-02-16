// requiring express
import express from 'express';
import controllers from '../controllers';
import authenticate from '../middleware/auth';
import middleware from '../middleware/validate';

const router = express.Router();


// CREATE - adds new red-flag record to the DB
router.post('/interventions',
  authenticate.isLoggedIn,
  middleware.checkInterventionInput,
  controllers.createIntervention);

router.get('/interventions',
  authenticate.isLoggedIn,
  controllers.getAllInterventions);

router.get('/interventions/:id',
  authenticate.isLoggedIn,
  controllers.getSpecificIntervention);

// EDIT - for editing a particular intervention location record
router.patch('/interventions/:id/location',
  authenticate.isLoggedIn,
  middleware.validateLocation,
  controllers.editInterventionLocation);

// // EDIT - for editing a particular red-flag record's comment
router.patch('/interventions/:id/comment',
  authenticate.isLoggedIn,
  middleware.validateComment,
  controllers.editInterventionComment);

// // DELETE - for deleting a red-flag
router.delete('/interventions/:id',
  authenticate.isLoggedIn,
  controllers.deleteIntervention);

export default router;
