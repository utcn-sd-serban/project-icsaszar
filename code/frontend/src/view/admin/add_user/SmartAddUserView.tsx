import * as React from "react";
import {AddUserView} from "./AddUserView";
import {connect} from "react-redux";
import {AppState} from "../../../model/state/store";
import {User, UserRole} from "../../../model/objects/user/User";
import {AddUserStateField, ExtraUserInfo, StudentExtraInfo} from "../../../model/state/add_user/types";
import {Dispatch} from "redux";
import {addUserPresenter} from "../../../presenter/admin/add_user/AddUserPresenter";
import {StudentGroup} from "../../../model/objects/user/Student";
import {Omit} from "../../../App";
import {getStudentGroupById} from "../../../model/state/student_group/selectors";

interface Props {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
    onChangeInput: (field: AddUserStateField, value: string) => void;
    onSubmit: (
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        role: UserRole,
        extraUserInfo: ExtraUserInfo) => () => void;

    groups: StudentGroup[];
    onSelectStudentGroup: (selectedGroup: number) => void;

    selectedGroupId: number;
    selectedStudentGroup: StudentGroup;
}

function selectExtraInfo(role: UserRole, selectedGroup: StudentGroup): ExtraUserInfo{
    switch (role) {
        case "ADMIN":
            return {};
        case "STUDENT":
            return {group: selectedGroup} as StudentExtraInfo;
        case "TEACHER":
            return {};
    }
}

const SmartAddUserView: React.FC<Props> =
    (props) => {
    let {
        firstName,
        lastName,
        role,
        password,
        username,
        onSubmit,
        selectedStudentGroup
    } = props;
    let extraInfo = selectExtraInfo(role, selectedStudentGroup);
    return(
        <AddUserView {...props}
            onSubmit={onSubmit(username, password, firstName, lastName, role, extraInfo)}
        />)
    };

function mapStateToProps(state: AppState): Omit<Props,  "onChangeInput" | "onSubmit" | "onSelectStudentGroup" > {
    let {password, role, lastName, firstName, username} = state.addUserState;
    return {
        username: username,
        lastName: lastName,
        firstName: firstName,
        password: password,
        role: role,
        groups: state.studentGroupState.groups,
        selectedGroupId: state.addUserState.selectedGroupId,
        selectedStudentGroup: getStudentGroupById(state, state.addUserState.selectedGroupId)!!
    }
}

function mapDispatchToProps(dispatch: Dispatch): Pick<Props, "onChangeInput" | "onSubmit" | "onSelectStudentGroup"> {
    let presenter = addUserPresenter(dispatch);
    return {
        onChangeInput: (field, value) => presenter.handleInputChange(field, value),
        onSubmit:
            (
                username: string,
                password: string,
                firstName: string,
                lastName: string,
                role: UserRole,
                extraUserInfo: ExtraUserInfo
            ) => () => presenter.handleSubmit(username, password, firstName, lastName, role, extraUserInfo),
        onSelectStudentGroup: (selectedGroup) => presenter.handleSelectStudentGroup(selectedGroup)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartAddUserView)