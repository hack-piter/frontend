import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { mainApi } from './api/mainApi.ts';

const rootReducer = combineReducers({
    [mainApi.reducerPath]: mainApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mainApi.middleware),
    devTools: true,
});

