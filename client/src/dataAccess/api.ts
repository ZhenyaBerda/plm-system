import {GRAPH_PATH} from "../@types";
import {Preview} from "./models";

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

export const getItemPreview = async (accessToken: string, groupId: string, itemId: string): Promise<Preview> => {
    const response = await fetch(`${GRAPH_PATH}/beta/groups/${groupId}/drive/items/${itemId}/createLink`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }
    )

   return response.json();
}