import {ParticipationStatusFilter, SET_REVIEW_RESULTS_FILTER, SetReviewResultsFilterAction} from "./types";
import {Participation, ParticipationReviewStatus} from "../../objects/activity/Participation";
import {ThunkResult} from "../store";
import TeacherRestClient from "../../../rest/TeacherRestClient";
import {doAddParticipationData} from "../participation_data/actions";

export function doSetReviewResultsFilter(newFilter: ParticipationStatusFilter): SetReviewResultsFilterAction{
    return {
        type: SET_REVIEW_RESULTS_FILTER,
        payload: {
            newValue: newFilter
        }
    }
}

export function sendNewReviewStatus(eventId: number, studentId: number, newStatus: ParticipationReviewStatus): ThunkResult<Promise<void>> {
    return async function(dispatch) {
        let result = await TeacherRestClient.sendParticipationReview(eventId, studentId, newStatus);
        if(result.status === "error" || result.status === "failed")
            throw Error("Failed to send participation review");
        let data: Participation = await result.data.json();
        dispatch(doAddParticipationData(data))
    }
}