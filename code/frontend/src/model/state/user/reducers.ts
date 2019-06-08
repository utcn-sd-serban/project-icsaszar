import {LOGOUT_CURRENT_USER, SET_CURRENT_USER, UserActions, UserState} from "./types";

const initialState: UserState = {
    currentUser: undefined
};

export function userReducer(state: UserState = initialState, action: UserActions): UserState {
    switch (action.type) {
        case LOGOUT_CURRENT_USER:
            return {
                ...state,
                currentUser: undefined
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload.user
            };

        default:
            return state;
    }
}