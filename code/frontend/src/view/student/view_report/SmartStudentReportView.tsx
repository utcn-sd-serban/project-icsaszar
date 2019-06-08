import * as React from "react";
import {AppState} from "../../../model/state/store";
import {connect} from "react-redux";
import {Participation} from "../../../model/objects/activity/Participation";
import {StudentReportView} from "./StudentReportView";

interface Props {
    participations: Participation[]
}

const SmartStudentReportView: React.FC<Props> = props => (
    <div>
        <StudentReportView participations={props.participations}/>
    </div>
);

function mapStateToProps(state: AppState): Props {
    return {
        participations: state.participationDataState.participations
    }
}

export default connect(mapStateToProps)(SmartStudentReportView);