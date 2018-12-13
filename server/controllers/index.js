import {
  createRedFlag,
  getRedFlags,
  getSpecificRedFlag,
  editLocation, editComment,
  deleteRedFlag,
} from './incidents/red-flags';

import {
  signup,
} from './users/auth';

export default {
  getRedFlags,
  getSpecificRedFlag,
  createRedFlag,
  editLocation,
  editComment,
  deleteRedFlag,
  signup,
};
