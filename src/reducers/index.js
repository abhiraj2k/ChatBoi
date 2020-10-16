import { combineReducers } from "redux";
import authReducer from "./AuthenticationReducer";
import userReducer from "./usersReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
});
