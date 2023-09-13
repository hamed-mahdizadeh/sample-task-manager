import { configureStore } from "@reduxjs/toolkit";
import uiSlice  from "./ui-slice";
import tasksSlice from "./tasks-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        tasks: tasksSlice.reducer
    }
});


export type RootState = ReturnType<typeof store.getState>;

export type GetState = typeof store.getState;

export type AppDispatch = typeof store.dispatch;

export default store;