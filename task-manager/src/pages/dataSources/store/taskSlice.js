
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    analytics: {
        count: 0,
        done: 0,
        left: 0
    }
};

const taskSlice = createSlice({
    initialState: initialState,
    name: "tasks",
    reducers: {
        loadTasks: (state, action) => {
            const { payload } = action;
      
            state.tasks = payload.tasks;
        },
        loadTasksAnalytics: (state, action) => {
            const { tasks } = state;
      
            state.analytics.count = tasks.length;

            const statuses = {
              done: 0,
              left: 0,
            };
      
            tasks.forEach((task) => {
              (task.column == "Done") ? statuses.done++ : statuses.left++;
            });
      
            state.analytics.done = statuses.done;
            state.analytics.left = statuses.left;
        },
        addTask: (state, action) => {
            const { payload } = action;
            state.tasks.push(payload);
        },
        updateOneTask: (state, action) => {
            const { payload } = action;
            state.tasks = state.tasks.map((task) => (task.id === payload.id ? payload : task));
        },
    }
});
        
export default taskSlice.reducer;

export const { loadTasks, loadTasksAnalytics } = taskSlice.actions;
