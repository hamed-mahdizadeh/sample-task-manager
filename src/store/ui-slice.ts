import { createSlice } from "@reduxjs/toolkit";
import dark from "../theme/dark";
import light from "../theme/light";
import { Theme } from "../types/ui";

export interface AppState {
    theme: Theme,
    searchParams: SearchParam
}

export interface SearchParam {
        page: string;
        searchTerm: string;
        order: 'asc' | 'desc' | '',
        sortBy: 'name' | 'age' | ''
}

const initialState: AppState = {
    theme: dark,
    searchParams: {
        page: '',
        searchTerm: '',
        order: '',
        sortBy: ''
    }
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        switchTheme(state) {
            if (state.theme.name === 'dark') {
                state.theme = light;
            } else {
                state.theme = dark;
            }
        },
        updateSearchParams(
            state,
            action:
                {
                    payload: Partial<SearchParam>
                }) {
            state.searchParams = {
                ...state.searchParams,
                ...action.payload
            }
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;


