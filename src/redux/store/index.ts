import { configureStore } from '@reduxjs/toolkit';
import spaceReducer from '../slices/spaceX/spaceX';
export const store = configureStore({
  reducer: {
    spaceX: spaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
