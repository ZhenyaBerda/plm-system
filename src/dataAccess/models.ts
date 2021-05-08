export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    businessPhone?: string | null,
    jobTitle?: string | null,
    officeLocation?: string | null,
}

export enum ProcessType {
    TASK = 'задача',
    DOC = 'документация'
}

export interface  TaskModel {
    planId: string,
    title: string,
}

export interface UpdateTaskModel {
    planId: string,
    title?: string,
    description?: string,
    assignments?: any | null,
    dueDateTime?: string | null,
}

export interface Task {
    id: string,
    planId: string,
    percentComplete: number,
    assigmentBy: string,
    dueDateTime: string,
    title: string,
   description?: string
}

export interface Member {
    id: string,
}

export interface Group {
    key?: string,
    id: string,
    displayName: string,
    mail?: string,
    description: string | null,
    mailEnabled?: boolean,
    mailNickname?: string | null,
    securityEnabled?: boolean,
    members?: Member[],
}

export interface GroupFile {
    id: string,
    name: string,
    createdDate: string,
    createdBy: string,
    lastModifiedDate: string,
    lastModifiedBy: string,
    file: any,
    webUrl: string,
}

export interface Preview {
    getUrl: string,
    postParameters: string,
    postUrl: string
}