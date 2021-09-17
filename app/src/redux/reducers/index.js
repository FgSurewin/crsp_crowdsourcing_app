import { combineReducers } from "redux";
import map from "./map";
import user from "./user";
import streetView from "./streetView";
export default combineReducers({ map, user, streetView });
