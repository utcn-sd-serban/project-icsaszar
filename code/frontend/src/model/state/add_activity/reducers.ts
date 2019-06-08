import {AddActivityActions, AddActivityState, SET_ACTIVITY_NAME, SET_SELECTED_ADD_ACTIVITY_FIELD} from "./types";


const initialState: AddActivityState = {
    activityName: "",
    selectedCategoryId: 1,
    selectedOrganizerId: 1
};

export function addActivityReducer(state: AddActivityState = initialState, action: AddActivityActions): AddActivityState {
    switch (action.type) {
        case SET_SELECTED_ADD_ACTIVITY_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            };
        case SET_ACTIVITY_NAME:
            return {
                ...state,
                activityName: action.payload.value
            };
        default:
            return state;
    }
}