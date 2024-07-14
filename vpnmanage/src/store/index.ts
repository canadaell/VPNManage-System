import { legacy_createStore} from "redux";
import reducer from "@/store/reducer";

//create a store
//let browser use redux-dev-tools
const store = legacy_createStore(reducer);

export default store;

