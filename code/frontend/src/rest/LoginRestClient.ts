import HttpRequestBuilder from "./HttpRequestBuilder";

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



export default class LoginRestClient {
    private static httpRequestBuilder?: HttpRequestBuilder = undefined;

    static initialize(username: string, password: string) {
        if (this.httpRequestBuilder !== undefined) {
            delete this.httpRequestBuilder;
            this.httpRequestBuilder = undefined;
        }

        this.httpRequestBuilder = new HttpRequestBuilder(username, password)
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
        if (this.httpRequestBuilder === undefined) throw Error("LoginRestClient not initialized!");
        let {info, init} = this.httpRequestBuilder.createLoginRequest("login");
        return LoginRestClient.makeAsyncRequest(info, init);
    }

    static async logout(): Promise<ResponseData> {
        if (this.httpRequestBuilder === undefined) throw Error("LoginRestClient not initialized!");
        let {info, init} = this.httpRequestBuilder.createPostRequest("logout",{});
        this.httpRequestBuilder = undefined;
        return LoginRestClient.makeAsyncRequest(info, init);
    }

    static async fetchDetails(): Promise<ResponseData> {
        if (this.httpRequestBuilder === undefined) throw Error("LoginRestClient not initialized!");
        let {info, init} = this.httpRequestBuilder.createGetRequest("account");
        return LoginRestClient.makeAsyncRequest(info, init);
    }

}


