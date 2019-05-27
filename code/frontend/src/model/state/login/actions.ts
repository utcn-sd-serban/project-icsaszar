import {
    CHANGE_LOGIN_FIELD,
    ChangeLoginFieldAction,
    CLEAR_LOGIN_FIELDS,
    ClearLoginFieldsAction,
    LoginField, SET_FAILED_LOGIN, SetFailedLoginAction
} from "./types";

export function doChangeLoginField(field: LoginField, newValue: string): ChangeLoginFieldAction {
    return {
        type: CHANGE_LOGIN_FIELD,
        payload: {
            field: field,
            value: newValue,
        }
    }
}

export function doClearLoginFields(): ClearLoginFieldsAction {
    return {
        type: CLEAR_LOGIN_FIELDS
    }
}

export function doSetFailedLogin(errorMsg: string = ""): SetFailedLoginAction{
    return {
        type: SET_FAILED_LOGIN,
        payload: {
            errorMsg: errorMsg
        }
    }
}