import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    boards: [],
    currentSelected: null,
};

const boardSlice = createSlice({
    initialState: initialState,
    name: "boards",
    reducers: {
        loadBoards: (state, action) => {
            const { payload } = action;
      
            state.boards = payload.boards.map((board) => {
              const { _id, title } = board;
      
              return {
                id: _id,
                name: title,
              };
            });
        },
        selectBoard: (state, action) => {
            const { payload } = action;
      
            const selected = state.boards.find((board) => board.id === payload._id);
      
            state.currentSelected = selected;
        },
        addBoard: (state, action) => {
            const { payload } = action;

            state.boards.push(payload);
        }
    }
});

export default boardSlice.reducer;

export const { loadBoards, selectBoard, addBoard } = boardSlice.actions;