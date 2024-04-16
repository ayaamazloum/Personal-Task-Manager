import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
    initialState: { tags: [] },
    name: "tags",
    reducers: {
        loadTags: (state, action) => {
            const { payload } = action;
      
            state.tags = payload.tags;
        },
        addTag: (state, action) => {
            const { payload } = action;
            state.tags.push(payload);
        },
    }
});

export default tagSlice.reducer;

export const { loadTags, addTag } = tagSlice.actions;
