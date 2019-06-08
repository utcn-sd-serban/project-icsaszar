import {connect} from "react-redux";
import {AppState} from "../../../model/state/store";
import {Dispatch} from "redux";
import {Participation, ParticipationReviewStatus} from "../../../model/objects/activity/Participation";
import {reviewResultsPresenter} from "../../../presenter/teacher/review_results/ReviewResultsPresenter";
import {getParticipationsByStatus} from "../../../model/state/participation_data/selectors";
import * as React from "react";
import {ParticipationStatusFilter} from "../../../model/state/review_results/types";
import {ReviewResultsView} from "./ReviewResultsView";


interface Props {
    participations: Participation[];
    currentFilter: ParticipationStatusFilter

    onSave: (eventId: number, studentId: number, newStatus: ParticipationReviewStatus) => void;
    onSetFilter: (newFilter: ParticipationStatusFilter) => void;
}

const SmartReviewResultsView: React.FC<Props> = (props) => {
    let {} = props;
    return (
        <ReviewResultsView {...props}/>
    )
};

type StateProps = Pick<Props,
    | "participations"
    | "currentFilter">

function mapStateToProps(state: AppState): StateProps {
    let {currentFilter} = state.reviewResultsState;
    return {
        participations: getParticipationsByStatus(state, currentFilter),
        currentFilter: state.reviewResultsState.currentFilter
    }
}

type DispatchProps = Pick<Props,
    | "onSave"
    | "onSetFilter">

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    let presenter = reviewResultsPresenter(dispatch);
    return {
        onSave: (eventId, studentId, newStatus) => presenter.handleSave(eventId, studentId, newStatus),
        onSetFilter: newFilter => presenter.handleSetFilter(newFilter)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartReviewResultsView);