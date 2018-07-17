import { applyMiddleware, createStore } from 'redux';
import { reducer } from './reducer';

export const configureStore = () => {
    return createStore(
        reducer
    );
};
