import { configureStore } from "@reduxjs/toolkit";
import citiesSlice from "./slices/citiesSlice";
import cursorSlice from "./slices/cursorSlice";

export const store = configureStore({
    reducer: {
        cities: citiesSlice.reducer,
        cursor: cursorSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;