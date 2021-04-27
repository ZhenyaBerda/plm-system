export interface User {
    id: string,
    firstName: string
    lastName: string
    email: string
}

export enum TaskType {
    TASK = 'задача',
    DOC = 'документация'
}

export interface Task {
    id: string,
    title: string,
    content: string,
    type: TaskType,
    time: string
}

export interface Group {
    key: string,
    id: string,
    displayName: string,
    mail: string,
    description: string
}