import {
  signup,
  login,
} from './users/auth';

import {
  createRedFlag,
  getRedFlags,
  getSpecificRedFlag,
  editLocationRedFlag,
  editCommentRedFlag,
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
  deleteRedFlag,
  editLocationRedFlag,
  editCommentRedFlag,
  signup,
  login,
  createIntervention,
  getInterventions,
  getSpecificIntervention,
  editLocationIntervention,
  editCommentIntervention,
  deleteIntervention,
};
