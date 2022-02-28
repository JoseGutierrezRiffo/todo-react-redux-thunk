import { combineReducers } from "redux";
import todoReducers from "./todoReducers";

const rootReducer = combineReducers({ todos: todoReducers });

export default rootReducer;
