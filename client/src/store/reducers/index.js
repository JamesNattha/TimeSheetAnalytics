// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import calendar from './calendar';
import snackbar from './snackbar';
import auth from './auth';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  calendar,
  snackbar,
  auth
});

export default reducers;
