import {AppState} from "../model/state/store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {LoginField} from "../model/state/login/types";
import {doChangeLoginField} from "../model/state/login/actions";
import {loginUser} from "../model/state/user/actions";

export const loginPresenter = (dispatch: ThunkDispatch<AppState, undefined, Action>) => ({
    handleInputChange: (field: LoginField, value: string) => {
        dispatch(doChangeLoginField(field, value))
    },

    handleLogin: (username: string, password: string) => {
        dispatch(loginUser(username, password))
    }
});