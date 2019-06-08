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

    static fromObject({
                          activityEvent,
                          student,
                          preparingTeacher,
                          result,
                          reviewStatus
                      }: Participation) {
        return new Participation(
            ActivityEvent.fromObject({...activityEvent}),
            student,
            preparingTeacher,
            result,
            reviewStatus
        )
    }

    static fromJSON({
                        activityEvent,
                        student,
                        preparingTeacher,
                        result,
                        reviewStatus
                    }: Participation ) {
        return new Participation(
            ActivityEvent.fromJSON(activityEvent),
            student,
            preparingTeacher,
            result,
            reviewStatus
        )
    }

    static equals(p1: Participation, p2: Participation): boolean {
        return (p1.activityEvent.id === p2.activityEvent.id)
            && (p1.student.id === p2.student.id)
    }
}

export class ParticipationResult {
    constructor(
        readonly name: string,
        readonly id: number = 0
    ) {
    }
}