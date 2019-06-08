import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../../model/state/store";
import {Action} from "redux";
import {logoutUser} from "../../model/state/user/actions";
import * as H from 'history'

export const navbarPresenter = (dispatch: ThunkDispatch<AppState, undefined, Action>) => ({
    handleLogout: async (history: H.History) => {
        await dispatch(logoutUser());
        history.push("/")
    }
});