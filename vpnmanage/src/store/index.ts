import { legacy_createStore} from "redux";
import reducer from "@/store/reducer";


//create a store
//let browser use redux-dev-tools
const store = legacy_createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

