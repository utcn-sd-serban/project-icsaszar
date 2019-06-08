import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../../../model/state/store";
import {Action} from "redux";
import {ParticipationStatusFilter} from "../../../model/state/review_results/types";
import {doSetReviewResultsFilter, sendNewReviewStatus} from "../../../model/state/review_results/actions";
import {ParticipationReviewStatus} from "../../../model/objects/activity/Participation";

export const reviewResultsPresenter = (dispatch: ThunkDispatch<AppState, undefined, Action>) => ({
    handleSave: (eventId: number, studentId: number, newStatus: ParticipationReviewStatus) => {
        dispatch(sendNewReviewStatus(eventId, studentId, newStatus))
    },

    handleSetFilter: (newFilter: ParticipationStatusFilter) => {
        dispatch(doSetReviewResultsFilter(newFilter))
    }
});