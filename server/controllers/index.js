import {
  signup,
  login,
} from './users/auth';

import {
  createRedFlag,
  getRedFlags,
  getSpecificRedFlag,
  editLocation, editComment,
  deleteRedFlag,
} from './incidents/red-flags';

import {
  createIntervention,
  getInterventions,
  getSpecificIntervention,
  editLocationIntervention,
  editCommentIntervention,
  deleteIntervention,
} from './incidents/intervention';

export default {
  getRedFlags,
  getSpecificRedFlag,
  createRedFlag,
  editLocation,
  editComment,
  deleteRedFlag,
  signup,
  login,
  createIntervention,
  getInterventions,
  getSpecificIntervention,
  editLocationIntervention,
  editCommentIntervention,
  deleteIntervention,
};
