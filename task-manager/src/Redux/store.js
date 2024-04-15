import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import boardReducer from './boardSlice';
import taskReducer from './taskSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        board: boardReducer,
        task: taskReducer,
    },
});