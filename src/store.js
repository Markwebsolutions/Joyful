// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'; // Uses sessionStorage
import productsReducer from './features/productsSlice';

// Persist configuration
const persistConfig = {
    key: 'root', // Key for the persisted state
    storage: sessionStorage, // Use sessionStorage instead of localStorage
    whitelist: ['products'], // Only persist the 'products' reducer
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, productsReducer);

// Configure the Redux store
export const store = configureStore({
    reducer: {
        products: persistedReducer, // Use the persisted reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Required for redux-persist
        }),
});

// Export the persistor to wrap the app
export const persistor = persistStore(store);