import {ActivityEvent} from "../model/objects/activity/ActivityEvent";
import {Teacher} from "../model/objects/user/Teacher";
import {ParticipationResult} from "../model/objects/activity/Participation";
import BaseRestClient, {ResponseData} from "./BaseRestClient";

export default class StudentRestClient {
    static async sendParticipation(event: ActivityEvent, preparingTeacher: Teacher, result: ParticipationResult): Promise<ResponseData>{
        let studentParticipation = {
            event: event,
            preparingTeacher: preparingTeacher,
            result: result
        };
        return BaseRestClient.doPostRequest("student/participations", studentParticipation)
    }

    static async fetchParticipationData(): Promise<ResponseData>{
        return  BaseRestClient.doGetRequest("student/participation");
    }

    static async fetchTeacherData(): Promise<ResponseData>{
        return BaseRestClient.doGetRequest("data/teachers")
    }

}