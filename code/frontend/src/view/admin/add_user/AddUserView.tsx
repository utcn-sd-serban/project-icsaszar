import * as React from "react";
import {USER_ROLES, UserRole} from "../../../model/objects/user/User";
import {AddUserStateField} from "../../../model/state/add_user/types";
import {StudentGroup} from "../../../model/objects/user/Student";

interface Props {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
    onChangeInput: (field: AddUserStateField, value: string) => void;
    onSelectStudentGroup: (selectedGroup: number) => void;
    onSubmit: () => void;
    groups: StudentGroup[];
    selectedGroupId: number;
}

interface ExtraProps {
    role: UserRole;
    groups: StudentGroup[];
    onSelectStudentGroup: (selectedGroup: number) => void;
    selectedGroupId: number;
}

const ExtraInfoInputGroup: React.FC<ExtraProps> = ({role, groups, onSelectStudentGroup, selectedGroupId}) => {
    switch (role) {
        case "ADMIN":
            return (
                <div>
                    Admin
                </div>
            );
        case "STUDENT":
            return (
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Group</label>
                    </div>
                    <select
                        className="custom-select"
                        id="inputGroupSelect01"
                        value={selectedGroupId}
                        onChange={({target: {value}}) => onSelectStudentGroup(Number.parseInt(value))}
                    >
                        {
                            groups.map(({id, name}) =>
                                <option value={id}>
                                    {name}
                                </option>
                            )
                        }
                    </select>
                </div>
            );
        case "TEACHER":
            return (
                <div>
                    Teacher
                </div>
            )
    }
};

export const AddUserView: React.FC<Props> =
    ({
         firstName,
         lastName,
         username,
         password,
         role,
         onChangeInput,
         onSubmit,
         selectedGroupId,
         onSelectStudentGroup,
         groups
     }) => (
        <div className="container">
            <h1>Add user</h1>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Username</span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={({target: {value}}) => onChangeInput("username", value)}
                />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Password</span>
                </div>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={({target: {value}}) => onChangeInput("password", value)}
                />
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">First and last name</span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={({target: {value}}) => onChangeInput("firstName", value)}
                />
                <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={({target: {value}}) => onChangeInput("lastName", value)}
                />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Role</label>
                </div>
                <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    value={role}
                    onChange={({target: {value}}) => onChangeInput("role", value)}
                >
                    {
                        USER_ROLES.map(value =>
                            <option value={value}>
                                {value.toLowerCase()}
                            </option>
                        )
                    }
                </select>
            </div>
            <ExtraInfoInputGroup
                groups={groups}
                role={role}
                onSelectStudentGroup={onSelectStudentGroup}
                selectedGroupId={selectedGroupId}
            />
            <button className="btn btn-primary" onClick={onSubmit}>
                Submit
            </button>
        </div>
    );