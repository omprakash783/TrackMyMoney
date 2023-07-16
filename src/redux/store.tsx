import { configureStore } from '@reduxjs/toolkit';
import { transSlice } from './transactionSlice';

export const store = configureStore({
  reducer: {
    trans: transSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
