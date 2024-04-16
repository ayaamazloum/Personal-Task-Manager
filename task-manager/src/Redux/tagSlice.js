import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
    initialState: { tags: [] },
    name: "tag",
    reducers: {
        loadTags: (state, action) => {
            const { payload } = action;
            
            state.tags = payload;
        },
        addTag: (state, action) => {
            const { payload } = action;
            state.tags.push(payload);
        },
    }
});

export default tagSlice.reducer;

export const { loadTags, addTag } = tagSlice.actions;
