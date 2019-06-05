import {ActivityEvent} from "./ActivityEvent";
import {Student} from "../user/Student";
import {Teacher} from "../user/Teacher";

export enum ParticipationReviewStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export class Participation {
    constructor(
        readonly activityEvent: ActivityEvent,
        readonly student: Student,
        readonly preparingTeacher: Teacher,
        readonly result: ParticipationResult,
        readonly reviewStatus: ParticipationReviewStatus
    ) {
    }
}

export class ParticipationResult {
    constructor(
        readonly name: string,
        readonly id: number = 0
    ) {
    }
}