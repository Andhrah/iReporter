// requiring express
import express from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const router = express.Router();


// CREATE - adds new red-flag record to the DB (data structure)
router.post('/interventions', controllers.createIntervention);

router.get('/interventions', controllers.getInterventions);

router.get('/interventions/:id', controllers.getSpecificIntervention);

// // EDIT - for editing a particular red-flag location
// router.patch('/interventions/:id/location', controllers.editLocationIntervention);

// // EDIT - for editing a particular red-flag record's comment
// router.patch('/interventions/:id/comment', controllers.editCommentIntervention);

// // DELETE - for deleting a red-flag
// router.delete('/interventions/:id', controllers.deleteIntervention);

export default router;
