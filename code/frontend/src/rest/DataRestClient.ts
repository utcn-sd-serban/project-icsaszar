import BaseRestClient, {ResponseData} from "./BaseRestClient";

export default class DataRestClient {

    static async fetchStudentGroups(): Promise<ResponseData> {
        return BaseRestClient.doGetRequest("data/groups");
    }


    static async fetchTeacherData(): Promise<ResponseData>{
        return BaseRestClient.doGetRequest("data/teachers")
    }


    static async fetchActivityData(): Promise<ResponseData>{
        return BaseRestClient.doGetRequest("data/activity-data");
    }
}