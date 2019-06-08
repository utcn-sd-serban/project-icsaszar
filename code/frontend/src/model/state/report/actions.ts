import {StudentGroup} from "../../objects/user/Student";
import {
    RECEIVE_STUDENT_GROUPS,
    ReceiveStudentGroupsAction, REQUEST_STUDENT_GROUPS,
    RequestStudentGroupsAction
} from "../student_group_data/types";
import {TeacherReport} from "../../objects/report/TeacherReport";
import {RECEIVE_REPORT, ReceiveReportAction, REQUEST_REPORT, RequestReportAction} from "./types";
import {ThunkResult} from "../store";
import TeacherRestClient from "../../../rest/TeacherRestClient";

export function doReceiveReport(data: TeacherReport): ReceiveReportAction {
    return {
        type: RECEIVE_REPORT,
        payload:{
            data: data
        }
    }
}

export function doRequestReport(): RequestReportAction {
    return {
        type: REQUEST_REPORT
    }
}

export function fetchTeacherReport(): ThunkResult<Promise<void>> {
    return async function(dispatch){
        dispatch(doRequestReport());
        let response = await TeacherRestClient.fetchReport();
        if(response.status === "failed" || response.status === "error")
            throw Error("Could not fetch report");

        let data: TeacherReport = await response.data.json();
        dispatch(doReceiveReport(data))
    }
}