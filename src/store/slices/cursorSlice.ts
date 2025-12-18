import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CursorState = {
    color: string;
    size: {
        width: number,
        height: number
    }
};

const initialState: CursorState = {
    color: "#5f5f5f",
    size: {
        width: 15,
        height: 15
    }
};

const cursorSlice = createSlice({
    name: "cursor",
    initialState,
    reducers: {
        setCursorHover(state, action: PayloadAction<string>) {
            state.color = action.payload;
            state.size = { width: 25, height: 25 }
        },
        resetCursor(state) {
            state.color = initialState.color;
            state.size = initialState.size;
        },
    },
});

export const { setCursorHover, resetCursor } = cursorSlice.actions;
export default cursorSlice;