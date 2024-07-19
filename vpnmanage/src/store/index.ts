import { legacy_createStore, combineReducers} from "redux";
import handleNum from "@/store/NumStatus";
import handleArr from "@/store/ArrStatus";

//combine reducers from every module 
const reducers = combineReducers({
   handleNum,
   handleArr
})
//create a store
//let browser use redux-dev-tools
const store = legacy_createStore(reducers);

export default store;

