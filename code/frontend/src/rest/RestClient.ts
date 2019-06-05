import {Student, StudentGroup} from "../model/objects/user/Student";
import {Teacher} from "../model/objects/user/Teacher";
import {Admin} from "../model/objects/user/Admin";
import {Activity} from "../model/objects/activity/Activity";
import {ActivityEvent} from "../model/objects/activity/ActivityEvent";

interface OkResponse {
    status: 'succeeded'
    data: Response
}

interface ErrorResponse {
    status: 'error'
    data: Response
}

interface Failed {
    status: 'failed'
}

export type ResponseData = OkResponse | ErrorResponse | Failed



function onSuccess(response: Response): ResponseData {
    if (response.status === 200) {
        return {
            data: response,
            status: 'succeeded'
        };
    } else {
        return {
            data: response,
            status: 'error'
        }
    }
}

function onFailure(err: any): ResponseData {
    console.log(err);
    return {
        status: 'failed'
    }
}

interface HttpRequest {
    info: RequestInfo;
    init: RequestInit;
}

export default class RestClient {

    private static client?: RestClient = undefined;

    static initialize(username: string, password: string) {
        if (this.client !== undefined) {
            delete this.client;
            this.client = undefined;
        }

        this.client = new RestClient(username, password)
    }

    private readonly username: string;
    private readonly password: string;

    static readonly BASE_URL: string = "http://localhost:8080/";

    private static createRequest(path: String, method: 'GET' | 'POST' | 'PUT' | 'DELETE'): HttpRequest {
        if (this.client === undefined) throw Error("RestClient not initialized!");
        return {
            info: RestClient.BASE_URL + path,
            init: {
                credentials: 'include',
                method: method,
                headers: {
                    'Content-Type': "application/json"
                }
            }
        }
    }

    private static createLoginRequest(path: String): HttpRequest {
        if (this.client === undefined) throw Error("RestClient not initialized!");
        let body = new FormData();
        body.append('username', this.client.username);
        body.append('password', this.client.password);
        return {
            info: RestClient.BASE_URL + path,
            init: {
                credentials: 'include',
                method: 'POST',
                body: body
            }
        }
    }

    private static createGetRequest(path: string) {
        return this.createRequest(path, 'GET')
    }

    private static createPostRequest<T>(path: string, body: T) {
        let req = this.createRequest(path, 'POST');
        return {
            ...req,
            init: {
                ...req.init,
                body: (typeof body === 'string') ? body : JSON.stringify(body)
            }
        }
    }

    private static createDeleteRequest(path: string) {
        return this.createRequest(path, "DELETE")
    }

    private static createPutRequest<T>(path: string, body: T) {
        let req = this.createRequest(path, 'PUT');
        return {
            ...req,
            init: {
                ...req.init,
                body: (typeof body === 'string') ? body : JSON.stringify(body)
            }
        }
    }

    private constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    private static async makeAsyncRequest(info: RequestInfo, init: RequestInit) {
        try {
            const response = await fetch(info, init);
            return onSuccess(response);
        } catch (err) {
            return onFailure(err);
        }
    }

    static async login(): Promise<ResponseData> {
        if (this.client === undefined) throw Error("RestClient not initialized!");
        let {info, init} = this.createLoginRequest("login");
        return RestClient.makeAsyncRequest(info, init);
    }

    static async logout(): Promise<ResponseData> {
        if (this.client === undefined) throw Error("RestClient not initialized!");
        let {info, init} = this.createPostRequest("logout",{});
        this.client = undefined;
        return RestClient.makeAsyncRequest(info, init);
    }

    static async fetchDetails(): Promise<ResponseData> {
        if (this.client === undefined) throw Error("RestClient not initialized!");
        let {info, init} = this.createGetRequest("account");
        return RestClient.makeAsyncRequest(info, init);
    }

    static async fetchStudentGroups(): Promise<ResponseData> {
        if (this.client === undefined) throw Error("RestClient not initialized!");
        let {info, init} = this.createGetRequest("data/groups");
        return RestClient.makeAsyncRequest(info, init);
    }

    static async sendStudent(student: Student, password: string): Promise<ResponseData>{
        if (this.client === undefined) throw Error("RestClient not initialized!");
        let studentWithPassword = {
            ...student,
            password: password
        };
        let {info, init} = this.createPostRequest("admin/students", studentWithPassword);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async sendTeacher(teacher: Teacher, password: string): Promise<ResponseData>{
        if (this.client === undefined) throw Error("RestClient not initialized!");
        let teacherWithPassword = {
            ...teacher,
            password: password
        };
        let {info, init} = this.createPostRequest("admin/teachers", teacherWithPassword);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async sendAdmin(admin: Admin, password: string): Promise<ResponseData>{
        if (this.client === undefined) throw Error("RestClient not initialized!");
        let adminWithPassword = {
            ...admin,
            password: password
        };
        let {info, init} = this.createPostRequest("admin/students", adminWithPassword);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async sendStudentGroup(groupName: string): Promise<ResponseData>{
        if (this.client === undefined) throw Error("RestClient not initialized!");
        let group = new StudentGroup(groupName);
        let {info, init} = this.createPostRequest("admin/groups", group);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async sendActivity(activity: Activity): Promise<ResponseData> {
        if (this.client === undefined) throw Error("RestClient not initialized!");
        let {init, info} = this.createPostRequest("admin/activities", activity);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async sendActivityEvent(activity: Activity, activityEvent: ActivityEvent): Promise<ResponseData> {
        if (this.client === undefined) throw Error("RestClient not initialized!");
        let {init, info} = this.createPostRequest(`admin/activities/${activity.id}/events`, activityEvent);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async fetchActivityData(): Promise<ResponseData>{
        if (this.client === undefined) throw Error("RestClient not initialized!");
        let {init, info} = this.createGetRequest("data/activity-data");
        return RestClient.makeAsyncRequest(info, init);
    }

}


