export interface User {
    firstName: string
    lastName: string
    email: string
    passwordHash?: string
}

export interface Task {
    id: string,
    title: string,
    content: string,
    time: string
}