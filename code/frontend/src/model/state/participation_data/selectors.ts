import {Participation} from "../../objects/activity/Participation";
import {AppState} from "../store";
import {ParticipationStatusFilter} from "../review_results/types";

export function getParticipationsByStatus(state: AppState, status: ParticipationStatusFilter): Participation[]{
    if (status === "ALL")
        return state.participationDataState.participations;
    else
        return state.participationDataState.participations.filter(p => p.reviewStatus === status)
}