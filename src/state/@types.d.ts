import { User } from "dataAccess/models";

export interface AppState {
    user: User
    isAuthenticated?: boolean | null
    authenticationError?: string | null
}
