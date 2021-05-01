import {GRAPH_PATH} from "../@types";

export const getUsers = async (accessToken: string) => {
    const response = await fetch(`${GRAPH_PATH}/v1.0/users`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            "Accept": "application/json"
        }
    })

   return response.json();
}

export const getGroupLists = async (accessToken: string) => {
    const response = await fetch(`${GRAPH_PATH}/v1.0/groups`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            "Accept": "application/json"
        }
    })

   return response.json();
}

export const getGroupFiles = async (accessToken: string, groupId: string) => {
    const response = await fetch(`${GRAPH_PATH}/v1.0/groups/${groupId}/drive/root/children`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            "Accept": "application/json"
        }
    })

    return response.json();
}