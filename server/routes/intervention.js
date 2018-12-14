// requiring express
import express from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const router = express.Router();


// CREATE - adds new red-flag record to the DB (data structure)
router.post('/interventions', middleware.isLoggedIn, middleware.checkUserInput, controllers.createIntervention);

router.get('/interventions', controllers.getInterventions);

router.get('/interventions/:id', middleware.isLoggedIn, controllers.getSpecificIntervention);

// EDIT - for editing a particular intervention location record
router.patch('/interventions/:id/location', middleware.isLoggedIn, middleware.validateLocation, controllers.editLocationIntervention);

// // EDIT - for editing a particular red-flag record's comment
router.patch('/interventions/:id/comment', middleware.isLoggedIn, middleware.validateComment, controllers.editCommentIntervention);

// // DELETE - for deleting a red-flag
router.delete('/interventions/:id', middleware.isLoggedIn, controllers.deleteIntervention);

export default router;
