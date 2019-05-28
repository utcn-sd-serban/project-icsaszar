import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkMiddleware} from "redux-thunk";
import {loginReducer} from "./login/reducers";
import {userReducer} from "./user/reducers";


const rootReducer = combineReducers({
    loginState: loginReducer,
    userState: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware as ThunkMiddleware<AppState, Action>));

