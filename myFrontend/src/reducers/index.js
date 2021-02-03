import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import deckReducer from './deckReducer';
import userReducer from './userReducer';
import visualsReducer from './visualsReducer';

const allReducers = combineReducers({
    counterReducer,
    deckReducer,
    userReducer,
    visualsReducer
});

export default allReducers;