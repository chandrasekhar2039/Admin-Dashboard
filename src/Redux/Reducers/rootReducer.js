import {combineReducers} from "redux";

import sidebarTogglerReducer from './sidebarToggler';
import authreducer from "./authReducer";
import categoryReducer from "./categoryReducers";
import deleteReducer from "./deleteReducer";
import dashboardReducer from "./dashboardReducer";
const reducer = combineReducers({
  sidebarToggler: sidebarTogglerReducer,
  dashboard:dashboardReducer,
  categoryReducer:categoryReducer,
  auth:authreducer,
  toDelete:deleteReducer
});
export default reducer;
