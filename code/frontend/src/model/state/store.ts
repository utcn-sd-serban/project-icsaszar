import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkMiddleware} from "redux-thunk";
import {loginReducer} from "./login/reducers";
import {userReducer} from "./user/reducers";
import {addUserReducer} from "./add_user/reducers";
import {studentGroupReducer} from "./student_group/reducers";
import {activityDataReducer} from "./activity_data/reducers";
import {addActivityReducer} from "./add_activity/reducers";
import {addEventReducer} from "./add_event/reducers";


const rootReducer = combineReducers({
    loginState: loginReducer,
    userState: userReducer,
    addUserState: addUserReducer,
    studentGroupState: studentGroupReducer,
    activityDataState: activityDataReducer,
    addActivityState: addActivityReducer,
    addEventState: addEventReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export type ThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware as ThunkMiddleware<AppState, Action>)));

