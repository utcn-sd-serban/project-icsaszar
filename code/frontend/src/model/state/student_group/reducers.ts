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
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_STUDENT_GROUPS:
            return {
                ...state,
                groups: action.payload.data
            };
        case ADD_NEW_STUDENT_GROUP:
            return {
                ...state,
                groups: [...state.groups, action.payload.newGroup]
            };
        default:
            return state;
    }
}