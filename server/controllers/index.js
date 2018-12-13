import {
  signup,
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
} from './incidents/intervention';

export default {
  getRedFlags,
  getSpecificRedFlag,
  createRedFlag,
  editLocation,
  editComment,
  deleteRedFlag,
  signup,
  createIntervention,
};
