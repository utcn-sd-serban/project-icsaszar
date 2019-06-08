import {Round} from "../activity/ActivityEvent";
import {Category} from "../activity/Activity";

export interface TeacherReport {
    header: string;
    rows: ReportRow[];
}

export interface ReportRow {
    category: Category
    subRows: ReportSubRow[]
}

export interface ReportSubRow{
    round: Round
    count: number
}

