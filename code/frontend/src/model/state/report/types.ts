import {TeacherReport} from "../../objects/report/TeacherReport";
import {Action} from "redux";

export const REQUEST_REPORT = "[REPORT] REQUEST REPORT";
export const RECEIVE_REPORT = "[REPORT] RECEIVE REPORT";

export interface ReportState {
    report: TeacherReport | undefined
    isFetching: boolean
}


export interface RequestReportAction extends Action{
    type: typeof REQUEST_REPORT
}

export interface ReceiveReportAction extends Action{
    type: typeof RECEIVE_REPORT
    payload: {
        data: TeacherReport
    }
}

export type ReportActions =
    | ReceiveReportAction
    | RequestReportAction