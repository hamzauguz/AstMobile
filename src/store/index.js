import {configureStore} from '@reduxjs/toolkit';
import user from './features/user-slice';

const store = configureStore({
  reducer: {
    user,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
