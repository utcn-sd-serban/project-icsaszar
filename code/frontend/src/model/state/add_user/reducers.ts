import {
    AddUserActions,
    AddUserState,
    CHANGE_ADD_USER_FIELD,
    CHANGE_SELECTED_GROUP_ID,
    SET_NEW_USER_ROLE
} from "./types";


const initialState: AddUserState = {
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "STUDENT",

    selectedGroupId: 1
};

export function addUserReducer(state: AddUserState = initialState, action: AddUserActions): AddUserState {
    switch (action.type) {
        case CHANGE_ADD_USER_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            };
        case SET_NEW_USER_ROLE:
            return {
                ...state,
                role: action.payload.role
            };
        case CHANGE_SELECTED_GROUP_ID:
            return {
                ...state,
                selectedGroupId: action.payload.value
            };
        default:
            return state;
    }
}