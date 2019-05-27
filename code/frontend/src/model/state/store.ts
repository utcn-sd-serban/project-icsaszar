import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkMiddleware} from "redux-thunk";
import {loginReducer} from "./login/reducers";


const rootReducer = combineReducers({
    loginState: loginReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware as ThunkMiddleware<AppState, Action>));

