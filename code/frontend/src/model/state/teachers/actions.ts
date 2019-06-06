<<<<<<< HEAD
import {
    ADD_NEW_TEACHER, AddNewTeacher,
    RECEIVE_TEACHERS,
    ReceiveTeachersAction,
    REQUEST_TEACHERS,
    RequestTeachersAction
} from "./types";
import {Teacher} from "../../objects/user/Teacher";

export function doReceiveStudentGroups(teachers: Teacher[]): ReceiveTeachersAction {
    return {
        type: RECEIVE_TEACHERS,
        payload:{
            data: teachers
=======
import {StudentGroup} from "../../objects/user/Student";
import {
    ADD_NEW_STUDENT_GROUP,
    AddNewStudentGroup,
    RECEIVE_STUDENT_GROUPS,
    ReceiveStudentGroupsAction,
    REQUEST_STUDENT_GROUPS,
    RequestStudentGroupsAction
} from "./types";

export function doReceiveStudentGroups(groups: StudentGroup[]): ReceiveStudentGroupsAction {
    return {
        type: RECEIVE_STUDENT_GROUPS,
        payload:{
            data: groups
>>>>>>> a7a15c76daf5bb2356740bf1305efe2e07ad72e6
        }
    }
}

<<<<<<< HEAD
export function doRequestStudentGroups(): RequestTeachersAction {
    return {
        type: REQUEST_TEACHERS
    }
}

export function doAddStudentGroup(newTeacher: Teacher): AddNewTeacher {
    return {
        type: ADD_NEW_TEACHER,
        payload: {
            newTeacher: newTeacher
=======
export function doRequestStudentGroups(): RequestStudentGroupsAction {
    return {
        type: REQUEST_STUDENT_GROUPS
    }
}

export function doAddStudentGroup(newGroup: StudentGroup): AddNewStudentGroup {
    return {
        type: ADD_NEW_STUDENT_GROUP,
        payload: {
            newGroup: newGroup
>>>>>>> a7a15c76daf5bb2356740bf1305efe2e07ad72e6
        }
    }
}