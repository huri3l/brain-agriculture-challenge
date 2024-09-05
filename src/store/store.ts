import { configureStore } from '@reduxjs/toolkit';
import ruralProducersReducer from './rural-producer-slice';

export const store = configureStore({
  reducer: {
    ruralProducers: ruralProducersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;