// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './store/language';

const store = configureStore({
  reducer: {
    language: languageReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;