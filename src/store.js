// store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

// Add session storage syncing
const STORAGE_KEY = 'redux_state';

// Load initial state from session storage
const preloadedState = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};

// Subscribe to store changes to persist to session storage
store.subscribe(() => {
    const state = store.getState();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
});
