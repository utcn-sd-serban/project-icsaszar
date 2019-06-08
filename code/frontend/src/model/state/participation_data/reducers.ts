import {
    ADD_PARTICIPATION_DATA,
    ParticipationDataActions,
    ParticipationDataState,
    RECEIVE_PARTICIPATION_DATA,
    REQUEST_PARTICIPATION_DATA
} from "./types";
import {Participation} from "../../objects/activity/Participation";
import {ActivityEvent} from "../../objects/activity/ActivityEvent";

const initialState: ParticipationDataState = {
    isFetching: false,
    participations: []
};

function contains<T>(list: T[], element: T, pred: (e1: T, e2: T) => boolean): boolean {
    return list
        .find(ek => pred(ek, ek)) !== undefined
}

function saveParticipationData(state: Participation[], participation: Participation): Participation[] {
    let existing = contains(
        state,
        participation,
        ((e1, e2) => Participation.equals(e1, e2))
    );
    if (existing) {
        return state.map(p => Participation.equals(p, participation) ? participation : p)
    } else {
        return [...state, participation]
    }

}

export function participationDataReducer(state: ParticipationDataState = initialState, action: ParticipationDataActions): ParticipationDataState {
    switch (action.type) {
        case RECEIVE_PARTICIPATION_DATA:
            return {
                ...state,
                participations: action.payload.data.map(p =>
                    Participation.fromJSON(p)
                ),
                isFetching: false
            };
        case REQUEST_PARTICIPATION_DATA:
            return {
                ...state,
                isFetching: true
            };
        case ADD_PARTICIPATION_DATA:
            return {
                ...state,
                participations: saveParticipationData(state.participations, Participation.fromJSON(action.payload.data))
            };
        default:
            return state;
    }
}