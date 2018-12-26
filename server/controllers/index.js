import {
  signup,
  login,
} from './user';

import {
  createRedFlag,
  getRedFlags,
  getSpecificRedFlag,
  editLocationRedFlag,
  editCommentRedFlag,
  deleteRedFlag,
} from './red-flags';

import {
  createIntervention,
  getAllInterventions,
  getSpecificIntervention,
  editLocationIntervention,
  editCommentIntervention,
  deleteIntervention,
} from './intervention';

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
  getAllInterventions,
  getSpecificIntervention,
  editLocationIntervention,
  editCommentIntervention,
  deleteIntervention,
};
