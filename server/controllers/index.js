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
  editRedFlagStatus,
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
  editRedFlagStatus,
  signup,
  login,
  createIntervention,
  getAllInterventions,
  getSpecificIntervention,
  editInterventionLocation,
  editInterventionComment,
  deleteIntervention,
};
