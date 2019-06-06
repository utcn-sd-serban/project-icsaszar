<<<<<<< HEAD
import {ADD_NEW_TEACHER, RECEIVE_TEACHERS, REQUEST_TEACHERS, TeacherActions, TeacherState} from "./types";

const initialState: TeacherState = {
    teachers: [],
    isFetching: false
};

export function teacherReducer(state: TeacherState = initialState, action: TeacherActions): TeacherState {
    switch (action.type) {
        case REQUEST_TEACHERS:
=======
import {
    ADD_NEW_STUDENT_GROUP,
    RECEIVE_STUDENT_GROUPS,
    REQUEST_STUDENT_GROUPS,
    StudentGroupActions,
    StudentGroupState
} from "./types";
import {StudentGroup} from "../../objects/user/Student";


const initialState: StudentGroupState = {
    groups: [new StudentGroup("g1",1), new StudentGroup("g2", 2)],
    isFetching: false
};

export function studentGroupReducer(state: StudentGroupState = initialState, action: StudentGroupActions): StudentGroupState {
    switch (action.type) {
        case REQUEST_STUDENT_GROUPS:
>>>>>>> a7a15c76daf5bb2356740bf1305efe2e07ad72e6
            return {
                ...state,
                isFetching: true
            };
<<<<<<< HEAD
        case RECEIVE_TEACHERS:
            return {
                ...state,
                teachers: action.payload.data
            };
        case ADD_NEW_TEACHER:
            return {
                ...state,
                teachers: [...state.teachers, action.payload.newTeacher]
=======
        case RECEIVE_STUDENT_GROUPS:
            return {
                ...state,
                groups: action.payload.data
            };
        case ADD_NEW_STUDENT_GROUP:
            return {
                ...state,
                groups: [...state.groups, action.payload.newGroup]
>>>>>>> a7a15c76daf5bb2356740bf1305efe2e07ad72e6
            };
        default:
            return state;
    }
}