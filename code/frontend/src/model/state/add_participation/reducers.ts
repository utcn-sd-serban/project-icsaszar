import {
    AddParticipationActions,
    AddParticipationState,
    SET_PARTCIPATION_ALREADY_EXISTS_ERROR,
    SET_SELECTED_ADD_PARTICIPATION_FIELD
} from "./types";

const initialState: AddParticipationState = {
    selectedEventId: 1,
    selectedResultId: 1,
    selectedTeacherId: 1,
    selectedActivityId: 1,
    alreadyExistsError: undefined
};

export function addParticipationReducer(state: AddParticipationState = initialState, action: AddParticipationActions): AddParticipationState {
    switch (action.type) {
        case SET_SELECTED_ADD_PARTICIPATION_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            };
        case SET_PARTCIPATION_ALREADY_EXISTS_ERROR:
            return {
                ...state,
                alreadyExistsError: action.payload.errorMsg
            };
        default:
            return state;
    }
}