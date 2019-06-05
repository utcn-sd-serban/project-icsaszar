import * as React from "react";
import {AddParticipationView} from "./AddParticipationView";
import {connect} from "react-redux";
import {ActivityEvent} from "../../../model/objects/activity/ActivityEvent";
import {Teacher} from "../../../model/objects/user/Teacher";
import {ParticipationResult} from "../../../model/objects/activity/Participation";
import {Dispatch} from "redux";
import {AppState} from "../../../model/state/store";

interface Props {
    events: ActivityEvent[];
    teachers: Teacher[];
    results: ParticipationResult[];

    selectedEventId: number;
    selectedTeacherId: number;
    selectedResultId: number;

    onChangeSelectedField: (field: string, value: number) => void;
    onSubmit: (event: ActivityEvent, preparingTeacher: Teacher, result: ParticipationResult) => () => void;
}


const SmartAddParticipationView: React.FC<Props> = ({}) => (
    <AddParticipationView/>
);

type StateProps = Pick<Props,
    | "events"
    | "teachers"
    | "results"
    | "selectedEventId"
    | "selectedTeacherId"
    | "selectedResultId">

function mapStateToProps(state: AppState): StateProps {
    return {
        events: [], results: [], selectedEventId: 0, selectedResultId: 0, selectedTeacherId: 0, teachers: []

    }
}


type DispatchProps = Pick<Props,
    | "onChangeSelectedField"
    | "onSubmit">

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    let presenter = {};
    return {
        onChangeSelectedField: (field, value) => presenter.handleChangeSelctedField(field, value),
        onSubmit: (event, preparingTeacher, result) => () => presenter.handleSubmit(event, preparingTeacher, result)
    }
}

export default connect(mapStateToProps)(SmartAddParticipationView)