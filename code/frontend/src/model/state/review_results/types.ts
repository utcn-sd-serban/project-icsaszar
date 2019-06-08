import {Action} from "redux";

export const SET_REVIEW_RESULTS_FILTER  = "[REVIEW RESULTS] SET FILTER";

export const PARTICIPATION_FILTERS = ['ALL', 'APPROVED', 'REJECTED', 'PENDING'] as const;
type ParticipationFilterTuple = typeof PARTICIPATION_FILTERS;

export type ParticipationStatusFilter = ParticipationFilterTuple[number]

export interface ReviewResultsState {
    currentFilter: ParticipationStatusFilter;
}

export interface SetReviewResultsFilterAction extends Action{
    type: typeof SET_REVIEW_RESULTS_FILTER;
    payload: {
        newValue: ParticipationStatusFilter
    }
}

export type ReviewResultsActions = SetReviewResultsFilterAction;