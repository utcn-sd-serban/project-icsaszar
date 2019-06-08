import {AddParticipationActions, AddParticipationState, SET_SELECTED_ADD_PARTICIPATION_FIELD} from "./types";

const initialState: AddParticipationState = {
    selectedEventId: 1,
    selectedResultId: 1,
    selectedTeacherId: 1,
    selectedActivityId: 1,
};

export function addParticipationReducer(state: AddParticipationState = initialState, action: AddParticipationActions): AddParticipationState{
    switch (action.type) {
        case SET_SELECTED_ADD_PARTICIPATION_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            };
        default:
            return state;
    }
}