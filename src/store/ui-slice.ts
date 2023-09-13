import { createSlice } from "@reduxjs/toolkit";
import dark from "../theme/dark";
import { Theme } from "../types/ui";
import light from "../theme/light";

const initialState = {
    theme: dark,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        switchTheme(state){
            if(state.theme.name === 'dark') {
                state.theme = light;
            } else {
                state.theme = dark;
            }
        },
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;


