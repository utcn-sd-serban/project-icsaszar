import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../../../model/state/store";
import {Action} from "redux";
import {AddUserStateField, ExtraUserInfo} from "../../../model/state/add_user/types";
import {addUser, doSetAddStudentField, doSetAddUserField} from "../../../model/state/add_user/actions";
import {UserRole} from "../../../model/objects/user/User";


export const addUserPresenter = (dispatch: ThunkDispatch<AppState, undefined, Action>) => ({

    handleInputChange: (field: AddUserStateField, value: string) => {
        dispatch(doSetAddUserField(field, value))
    },

    handleSubmit:
        (
            username: string,
            password: string,
            firstName: string,
            lastName: string,
            role: UserRole,
            extraUserInfo: ExtraUserInfo
        ) => {
            dispatch(addUser(username, password, firstName, lastName, role, extraUserInfo))
        },

    handleSelectStudentGroup: (selectedGroup: number) => {
        dispatch(doSetAddStudentField(selectedGroup))
    }
});