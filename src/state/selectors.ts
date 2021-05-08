import { AppState } from "./@types";

export const getAuthenticated = (state: AppState) => state.isAuthenticated;
export const getAuthenticationError = (state: AppState) => state.authenticationError;

export const getUser = (state: AppState) => state.user;