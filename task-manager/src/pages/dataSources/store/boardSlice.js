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
      
            state.boards = payload.map((board) => {
              const { id, name } = board;
      
              return {
                id,
                name,
              };
            });
        },
        selectBoard: (state, action) => {
            const { payload } = action;
      
            const selected = state.boards.find((board) => board.id === payload.id);
      
            state.currentSelected = selected;
        },
    }
});

export default boardSlice.reducer;

export const { loadBoards, selectBoard } = boardSlice.actions;