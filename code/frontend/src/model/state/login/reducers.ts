import {CHANGE_LOGIN_FIELD, CLEAR_LOGIN_FIELDS, LoginActions, LoginState, SET_FAILED_LOGIN} from "./types";

const initialState: LoginState = {
    passwordState: "",
    usernameState: "",
    failed: false   ,
    errorMsg: ""
};

export function loginReducer(state: LoginState = initialState, action: LoginActions): LoginState {
    switch (action.type) {
        case CHANGE_LOGIN_FIELD:
            let {field, value} = action.payload;
            if (field === "username")
                return {
                    ...state,
                    usernameState: value
                };
            else
                return {
                    ...state,
                    passwordState: value
                };
        case SET_FAILED_LOGIN:
            return {
                ...state,
                failed: true,
                errorMsg: action.payload.errorMsg
            };
        case CLEAR_LOGIN_FIELDS:
            return {
                ...initialState
            };
        default:
            return state;
    }
}
