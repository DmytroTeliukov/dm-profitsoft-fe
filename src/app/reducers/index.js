import { combineReducers } from 'redux';

import user from './user';
import menu from './menu';
import category from './category';

export default combineReducers({
  user,
  menu,
  category,
});
