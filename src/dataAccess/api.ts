import {GRAPH_PATH} from "../@types";
import {Preview} from "./models";

//USERS

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

export const getUserInfo = async (accessToken: string, userId: string) => {
    const response = await fetch(`${GRAPH_PATH}/v1.0/users/${userId}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            "Accept": "application/json"
        }
    })

    return response.json();
}

// GROUPS

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

export const deleteGroupFile = async (accessToken: string, groupId: string, itemId: string) => {
    const response = await fetch(`${GRAPH_PATH}/beta/groups/${groupId}/drive/items/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })

    return response.json();
}

export const uploadFile = async (accessToken: string, groupId: string, file: File) => {
    const response = await fetch(`${GRAPH_PATH}/v1.0/groups/${groupId}/drive/items/{parent-id}:/${file.name}:/content`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': `text/plain`
        },
    })

    return response.json();
}


//AGILE

export const getGroupPlans = async (accessToken: string, groupId: string) => {
    const response = await fetch(`${GRAPH_PATH}/v1.0/groups/${groupId}/planner/plans`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    })

    return response.json();
}

export const getPlanTasks = async (accessToken: string, planId: string) => {
    const response = await fetch (`${GRAPH_PATH}/v1.0/planner/plans/${planId}/tasks`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    })

    return response.json();
}

export const getGroupMembers = async (accessToken: string, groupId: string) => {
    const response = await fetch(`${GRAPH_PATH}/v1.0/groups/${groupId}/members`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    })

    return response.json();
}