import {
    AddEventActions,
    AddEventState,
    SET_NEW_EVENT_DATE,
    SET_NEW_EVENT_LOCATION,
    SET_SELECTED_ADD_EVENT_FIELD
} from "./types";

const initialState: AddEventState = {
    date: new Date(),
    location: "",
    selectedActivityId: 1,
    selectedRoundId: 1
};

export function addEventReducer(state: AddEventState = initialState, action: AddEventActions): AddEventState {
    switch (action.type) {
        case SET_SELECTED_ADD_EVENT_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            };
        case SET_NEW_EVENT_LOCATION:
            return {
                ...state,
                location: action.payload.value
            };
        case SET_NEW_EVENT_DATE:
            return {
                ...state,
                date: action.payload.value
            };
        default:
            return state;
    }
}