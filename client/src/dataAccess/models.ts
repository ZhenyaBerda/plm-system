export interface User {
    id: string,
    firstName: string
    lastName: string
    email: string
}

export enum ProcessType {
    TASK = 'задача',
    DOC = 'документация'
}

export interface Task {
    id: string,
    title: string,
    content: string,
    type: ProcessType,
    time: string
}

export interface Group {
    key: string,
    id: string,
    displayName: string,
    mail: string,
    description: string
}

export interface GroupFile {
    id: string,
    name: string,
    createdDate: string,
    createdBy: string,
    lastModifiedDate: string,
    lastModifiedBy: string,
    file: any
}