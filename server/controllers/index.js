import {
  signup,
  login,
} from './user';

import {
  createRedFlag,
  getAllRedFlags,
  getSpecificRedFlag,
  editRedFlagLocation,
  editRedFlagComment,
  deleteRedFlag,
} from './red-flags';

import {
  createIntervention,
  getAllInterventions,
  getSpecificIntervention,
  editInterventionLocation,
  editInterventionComment,
  deleteIntervention,
} from './intervention';

export default {
  getAllRedFlags,
  getSpecificRedFlag,
  createRedFlag,
  deleteRedFlag,
  editRedFlagLocation,
  editRedFlagComment,
  signup,
  login,
  createIntervention,
  getAllInterventions,
  getSpecificIntervention,
  editInterventionLocation,
  editInterventionComment,
  deleteIntervention,
};
