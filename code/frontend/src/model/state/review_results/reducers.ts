import {ReviewResultsActions, ReviewResultsState, SET_REVIEW_RESULTS_FILTER} from "./types";

const initialState: ReviewResultsState = {
    currentFilter: "ALL",
};

export function reviewResultsReducer(state: ReviewResultsState = initialState, action: ReviewResultsActions): ReviewResultsState {
    switch (action.type) {
        case SET_REVIEW_RESULTS_FILTER:
            return {
                ...state,
                currentFilter: action.payload.newValue
            };
        default:
            return state;
    }
}