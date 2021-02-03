import { HIDE_NAV, SHOW_NAV } from '../actions/actionTypes';

const initialState = {
    navVisible: true
}

export const hideNav = () => {
    return {
        type: HIDE_NAV
    };
}

export const showNav = () => {
    return {
        type: SHOW_NAV
    };
}

export default function (state = initialState, action) {
    switch (action.type) {
        case HIDE_NAV:
            return {
                ...state,
                navVisible: false
            };
        case SHOW_NAV:
            return {
                ...state,
                navVisible: true
            };
        default:
            return state;
    }
}