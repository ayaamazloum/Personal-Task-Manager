import { createSlice } from "@reduxjs/toolkit";

const columnSlice = createSlice({
    initialState: { columns: [] },
    name: "columns",
    reducers: {
        loadColumns: (state, action) => {
            const { payload } = action;
      
            state.columns = payload.columns;
        },
        addColumn: (state, action) => {
            const { payload } = action;
            state.columns.push(payload);
        },
    }
});

export default columnSlice.reducer;

export const { loadColumns, addColumn } = columnSlice.actions;
