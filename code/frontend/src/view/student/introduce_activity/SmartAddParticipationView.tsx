import * as React from "react";
import {AddParticipationView} from "./AddParticipationView";
import {connect} from "react-redux";
import {ActivityEvent} from "../../../model/objects/activity/ActivityEvent";
import {Teacher} from "../../../model/objects/user/Teacher";
import {ParticipationResult} from "../../../model/objects/activity/Participation";
import {Dispatch} from "redux";
import {AppState} from "../../../model/state/store";
import {findActivityById, findActivityEventById, findResultById} from "../../../model/state/activity_data/selectors";
import {Activity} from "../../../model/objects/activity/Activity";
import {addParticipationPresenter} from "../../../presenter/student/add_participation/AddParticipationPresenter";
import {findTeacherById} from "../../../model/state/teachers/selectors";
import {AddParticipationSelectedField} from "../../../model/state/add_participation/types";

interface Props {
    activities: Activity[];
    events: ActivityEvent[];
    teachers: Teacher[];
    results: ParticipationResult[];

    selectedEventId: number;
    selectedTeacherId: number;
    selectedResultId: number;
    selectedActivityId: number;

    selectedEvent: ActivityEvent;
    selectedTeacher: Teacher;
    selectedResult: ParticipationResult;

    onChangeSelectedField: (field: AddParticipationSelectedField, value: number) => void;
    onSubmit: (event: ActivityEvent, preparingTeacher: Teacher, result: ParticipationResult) => () => void;
}


const SmartAddParticipationView: React.FC<Props> = (props) => {
    let {
        onSubmit,
        selectedEvent,
        selectedResult,
        selectedTeacher
    } = props;
    return(
    <AddParticipationView {...props}
        onSubmit={onSubmit(selectedEvent, selectedTeacher, selectedResult)}
    />)
};

type StateProps = Pick<Props,
    | "activities"
    | "events"
    | "teachers"
    | "results"
    | "selectedEventId"
    | "selectedTeacherId"
    | "selectedResultId"
    | "selectedActivityId"
    | "selectedEvent"
    | "selectedResult"
    | "selectedTeacher">

function mapStateToProps(state: AppState): StateProps {
    let {
        selectedEventId,
        selectedResultId,
        selectedTeacherId,
        selectedActivityId
    } = state.addParticipationState;
    return {
        activities: state.activityDataState.activities,
        events: findActivityById(state, selectedActivityId)!!.events,
        results: state.activityDataState.results,

        selectedEventId: selectedEventId,
        selectedResultId: selectedResultId,
        selectedTeacherId: selectedTeacherId,
        selectedActivityId: selectedActivityId,

        teachers: state.teacherState.teachers,
        selectedEvent: findActivityEventById(state, selectedEventId, selectedActivityId)!!,
        selectedResult: findResultById(state, selectedEventId)!!,
        selectedTeacher: findTeacherById(state, selectedTeacherId)!!
    }
}


type DispatchProps = Pick<Props,
    | "onChangeSelectedField"
    | "onSubmit">

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    let presenter = addParticipationPresenter(dispatch);
    return {
        onChangeSelectedField: (field, value) => presenter.handleChangeSelectedField(field, value),
        onSubmit: (event, preparingTeacher, result) => () => presenter.handleSubmit(event, preparingTeacher, result)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartAddParticipationView)