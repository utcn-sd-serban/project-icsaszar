import {AppState} from "../../model/state/store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {LoginField} from "../../model/state/login/types";
import {doChangeLoginField} from "../../model/state/login/actions";
import {loginUser} from "../../model/state/user/actions";
import * as H from 'history'

export const loginPresenter = (dispatch: ThunkDispatch<AppState, undefined, Action>) => ({
    handleInputChange: (field: LoginField, value: string) => {
        dispatch(doChangeLoginField(field, value))
    },

    handleLogin: async (username: string, password: string, history: H.History) => {
        // Prevent login race condition, where the redirect occurs before the state is updated
        await dispatch(loginUser(username, password));
        history.push("/dashboard");
    }
});