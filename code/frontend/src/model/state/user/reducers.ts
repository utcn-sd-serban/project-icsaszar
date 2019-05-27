import {SET_CURRENT_USER, UserActions, UserState} from "./types";

const initialState: UserState = {
    currentUser: undefined
};

export function userReducer(state: UserState = initialState, action: UserActions): UserState {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }
}