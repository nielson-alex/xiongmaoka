import { SAVE_CARDS_TO_STATE, SAVE_DECKS_TO_STATE } from '../actions/actionTypes';

const initialState = {
    cards: [],
    decks: [],
}

export function deleteState() {
    return {
        type: 'DELETE_STATE',
        payload: []
    }
}

export function saveCardsToState(cards) {
    return {
        type: SAVE_CARDS_TO_STATE,
        payload: cards
    }
}

export function saveDecksToState(decks) {
    return {
        type: SAVE_DECKS_TO_STATE,
        payload: decks.sort((a, b) => a.deck_name > b.deck_name ? 1 : -1)
    }
}

export default function (state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case SAVE_CARDS_TO_STATE:
            return {
                ...state,
                cards: payload
            };
        case SAVE_DECKS_TO_STATE:
            return {
                ...state,
                decks: payload
            };
        case 'DELETE_STATE':
            return {
                cards: [],
                decks: []
            };
        default:
            return {
                ...state
            };
    }
}