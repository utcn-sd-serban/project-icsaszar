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

export default class BaseRestClient {
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

    static async doGetRequest(path: string): Promise<ResponseData>{
        if (this.httpRequestBuilder === undefined) throw Error("LoginRestClient not initialized!");
        let {info, init} = this.httpRequestBuilder.createGetRequest(path);
        return this.makeAsyncRequest(info, init);
    }

    static async doPostRequest<T>(path: string, body: T): Promise<ResponseData>{
        if (this.httpRequestBuilder === undefined) throw Error("LoginRestClient not initialized!");
        let {info, init} = this.httpRequestBuilder.createPostRequest(path, body);
        return this.makeAsyncRequest(info, init);
    }

    static async doPutRequest<T>(path: string, body: T): Promise<ResponseData>{
        if (this.httpRequestBuilder === undefined) throw Error("LoginRestClient not initialized!");
        let {info, init} = this.httpRequestBuilder.createPutRequest(path, body);
        return this.makeAsyncRequest(info, init);
    }

    static async doDeleteRequest(path: string): Promise<ResponseData>{
        if (this.httpRequestBuilder === undefined) throw Error("LoginRestClient not initialized!");
        let {info, init} = this.httpRequestBuilder.createDeleteRequest(path);
        return this.makeAsyncRequest(info, init);
    }

}


