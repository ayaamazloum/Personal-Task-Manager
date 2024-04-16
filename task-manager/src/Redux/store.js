import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import boardReducer from './boardSlice';
import tagReducer from './tagSlice';
import columnSlice from "./columnSlice";
import taskReducer from './taskSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        board: boardReducer,
        tag: tagReducer,
        column: columnSlice,
        task: taskReducer,
    },
});