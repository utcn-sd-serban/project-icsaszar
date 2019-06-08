export interface HttpRequest {
    info: RequestInfo;
    init: RequestInit;
}

export default class HttpRequestBuilder {

    private readonly username: string;
    private readonly password: string;

    static readonly BASE_URL: string = "http://localhost:8080/";

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    private static createRequest(path: String, method: 'GET' | 'POST' | 'PUT' | 'DELETE'): HttpRequest {
        return {
            info: HttpRequestBuilder.BASE_URL + path,
            init: {
                credentials: 'include',
                method: method,
                headers: {
                    'Content-Type': "application/json"
                }
            }
        }
    }

    createLoginRequest(path: String): HttpRequest {
        let body = new FormData();
        body.append('username', this.username);
        body.append('password', this.password);
        return {
            info: HttpRequestBuilder.BASE_URL + path,
            init: {
                credentials: 'include',
                method: 'POST',
                body: body
            }
        }
    }

    createGetRequest(path: string) {
        return HttpRequestBuilder.createRequest(path, 'GET')
    }

    createPostRequest<T>(path: string, body: T): HttpRequest {
        let req = HttpRequestBuilder.createRequest(path, 'POST');
        return {
            ...req,
            init: {
                ...req.init,
                body: (typeof body === 'string') ? body : JSON.stringify(body)
            }
        }
    }

    createDeleteRequest(path: string): HttpRequest {
        return HttpRequestBuilder.createRequest(path, "DELETE")
    }

    createPutRequest<T>(path: string, body: T): HttpRequest {
        let req = HttpRequestBuilder.createRequest(path, 'PUT');
        return {
            ...req,
            init: {
                ...req.init,
                body: (typeof body === 'string') ? body : JSON.stringify(body)
            }
        }
    }
}