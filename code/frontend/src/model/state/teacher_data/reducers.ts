import {ADD_NEW_TEACHER, RECEIVE_TEACHERS, REQUEST_TEACHERS, TeacherActions, TeacherState} from "./types";

const initialState: TeacherState = {
    teachers: [],
    isFetching: false
};

export function teacherReducer(state: TeacherState = initialState, action: TeacherActions): TeacherState {
    switch (action.type) {
        case REQUEST_TEACHERS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_TEACHERS:
            return {
                ...state,
                teachers: action.payload.data
            };
        case ADD_NEW_TEACHER:
            return {
                ...state,
                teachers: [...state.teachers, action.payload.newTeacher]
            };
        default:
            return state;
    }
}