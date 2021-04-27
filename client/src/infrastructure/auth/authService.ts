import {graphConfig} from "../../dataAccess/authConfig";

let _isAuthenticated: boolean | null = null;

const tokenKey = '9e29f9e5-41c3-4f09-a408-450c5829a784.c85bffce-e994-4b71-9bb4-7ef86f39211d-login.windows.net-accesstoken-a9922f48-71c7-4f41-b394-09ba1f09608b-c85bffce-e994-4b71-9bb4-7ef86f39211d-openid profile user.read email'

export const isAuthenticated = () => _isAuthenticated;
export const setIsAuthenticated = (value: boolean) => {
    _isAuthenticated = value;
}

export const getToken = () => {
    return localStorage.getItem(tokenKey) || '';
}

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = UnauthorizedError.name;
    }
}

export async function callMsGraph(accessToken: any): Promise<any> {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return await fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}