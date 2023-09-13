import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'dark',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        changeTheme(state, action: {payload: 'dark' | 'light'}){
            state.theme = action.payload;
        },
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;


