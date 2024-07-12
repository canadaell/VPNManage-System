import { legacy_createStore} from "redux";
import reducer from "@/store/reducer";
import exp from "constants";



//create a store
const store = legacy_createStore(reducer);

export default store;

