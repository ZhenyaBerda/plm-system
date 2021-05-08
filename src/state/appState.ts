import { User } from '../dataAccess/models';
import { AppState } from "./@types";

enum actions {
    LOG_IN,
    LOG_OUT,
    SET_AUTHENTICATION_ERROR,
}

export type AppAction =
    | { type: typeof actions.LOG_IN, user: User }
    | { type: typeof actions.LOG_OUT }
    | { type: typeof actions.SET_AUTHENTICATION_ERROR, error: string }
    ;

export const appActions = {
    login: (user: User) => ({ type: actions.LOG_IN, user }),
    logout: () => ({ type: actions.LOG_OUT }),
    setAuthenticationError: (error: string) => ({ type: actions.SET_AUTHENTICATION_ERROR, error }),
}

const initialState: AppState = {
    isAuthenticated: null,
    user: {
        id: "",
        firstName: "",
        lastName: "",
        email: ""
    }
}

export function reducer(state: AppState = initialState, action: AppAction): AppState {
    switch (action.type) {
        case actions.SET_AUTHENTICATION_ERROR: {
            return {
                ...state,
                authenticationError: action.error
            };
        }

        case actions.LOG_IN: {
            return {
                ...state,
                authenticationError: null,
                user: action.user,
                isAuthenticated: true
            };
        }

        case actions.LOG_OUT: {
            return {
                ...state,
                user: initialState.user,
                authenticationError: null,
                isAuthenticated: false
            };
        }

        // switch end
    }

    return state;
}