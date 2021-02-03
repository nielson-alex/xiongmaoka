import { LOG_IN, LOG_OUT, SIGN_UP } from '../actions/actionTypes';
import { POST } from '../helpers/API/service-calls';

const initialState = {
    user: {
        id: 52,
        firstName: 'Alex',
        lastName: 'Nielson',
        email: '',
        username: 'anielson',
        password: '123456',
        loggedIn: false
    }
}

export function login(userInfo) {
    let user = {
        id: userInfo.id,
        firstName: userInfo.first_name,
        lastName: userInfo.last_name,
        username: userInfo.username,
        email: userInfo.email,
        loggedIn: true
    };

    return {
        type: LOG_IN,
        payload: user
    };
}

export function logout() {
    return {
        type: LOG_OUT,
        payload: {}
    };
}

export function signup(user) {
    console.log(user);
    return {
        type: SIGN_UP,
        payload: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: user.password
        }
    };
}

export default function (state = initialState, action) {
    let { type, payload } = action;
    let user = {};

    switch (type) {
        case LOG_IN:
            return {
                ...state,
                user: payload
            };
        case LOG_OUT:
            // localStorage.removeItem('state');
            user = {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                password: '',
                loggedIn: false
            }
            return {
                ...state,
                user: user
            };
        case SIGN_UP:
            const newUser = {
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                username: payload.username,
                password: payload.password,
            };

            console.log(newUser);
            POST('/signup', newUser);

            return {
                ...state
            };
        default:
            return {
                ...state
            };
    }
}