import {TeacherReport} from "../../../model/objects/report/TeacherReport";
import * as React from "react";
import {AppState} from "../../../model/state/store";
import {connect} from "react-redux";
import {TeacherReportView} from "./TeacherReportView";

interface Props {
    report: TeacherReport
}

const SmartTeacherReportView: React.FC<Props> =
    (props) => (
        <TeacherReportView {...props}/>
    );

function mapStateToProps(state: AppState): Props {
    return {
        report: state.reportState.report!!
    }
}

export default connect(mapStateToProps)(SmartTeacherReportView);