import {ParticipationReviewStatus} from "../model/objects/activity/Participation";
import BaseRestClient, {ResponseData} from "./BaseRestClient";

export default class TeacherRestClient {
    static async sendParticipationReview(
        eventId: number,
        studentId: number,
        status: ParticipationReviewStatus
    ): Promise<ResponseData>{
        let wrappedParticipationStatus = {
            status: status
        };
        return BaseRestClient.doPostRequest(
            `teacher/participations?eventId=${eventId}&studentId=${studentId}`,
            wrappedParticipationStatus)
    }

    static async fetchParticipationData(): Promise<ResponseData>{
        return  BaseRestClient.doGetRequest(`teacher/participations`);
    }

    static async fetchReport(): Promise<ResponseData>{
        return BaseRestClient.doGetRequest("teacher/report")
    }
}