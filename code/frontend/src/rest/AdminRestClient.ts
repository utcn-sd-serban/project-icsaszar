import {ResponseData} from "./LoginRestClient";
import {Student, StudentGroup} from "../model/objects/user/Student";
import {Teacher} from "../model/objects/user/Teacher";
import {Admin} from "../model/objects/user/Admin";
import BaseRestClient from "./BaseRestClient";
import {Activity} from "../model/objects/activity/Activity";
import {ActivityEvent} from "../model/objects/activity/ActivityEvent";

export default class AdminRestClient {
    static async sendStudent(student: Student, password: string): Promise<ResponseData> {
        let studentWithPassword = {
            ...student,
            password: password
        };
        return BaseRestClient.doPostRequest("admin/students", studentWithPassword);
    }

    static async sendTeacher(teacher: Teacher, password: string): Promise<ResponseData> {
        let teacherWithPassword = {
            ...teacher,
            password: password
        };
        return BaseRestClient.doPostRequest("admin/teachers", teacherWithPassword);
    }

    static async sendAdmin(admin: Admin, password: string): Promise<ResponseData> {
        let adminWithPassword = {
            ...admin,
            password: password
        };
        return BaseRestClient.doPostRequest("admin/students", adminWithPassword);
    }

    static async sendActivity(activity: Activity): Promise<ResponseData> {
        return BaseRestClient.doPostRequest("admin/activities", activity);
    }

    static async sendActivityEvent(activity: Activity, activityEvent: ActivityEvent): Promise<ResponseData> {
        return BaseRestClient.doPostRequest(`admin/activities/${activity.id}/events`, activityEvent);
    }

    static async sendStudentGroup(groupName: string): Promise<ResponseData>{
        let group = new StudentGroup(groupName);
        return BaseRestClient.doPostRequest("admin/groups", group);
    }
}