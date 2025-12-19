import { configureStore } from "@reduxjs/toolkit";
import citiesSlice from "./slices/citiesSlice";
import cursorSlice from "./slices/cursorSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
    reducer: {
        cities: citiesSlice.reducer,
        cursor: cursorSlice.reducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;