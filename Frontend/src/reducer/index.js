import { combineReducers } from "redux";
import authReducer from "./userReducer";
import loginReducer from "./loginReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: loginReducer,
  post: postReducer 
});

export default rootReducer;
