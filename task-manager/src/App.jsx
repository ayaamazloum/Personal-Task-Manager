import "./styles/utilities.css";
import "./styles/colors.css";

import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Board from "./pages/Board";
import { useDispatch, useSelector } from "react-redux";
import { loadBoards } from "./Redux/boardSlice";
import { loadTags } from "./Redux/tagSlice";
import { loadColumns } from "./Redux/columnSlice";
import { loadTasks } from "./Redux/taskSlice";
import { loadTasksAnalytics } from "./Redux/taskSlice";
import sendRequest from "./core/tools/remote/request";
import { requestMehods } from "./core/enums/requestMethods";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const boardState = useSelector((global) => global.board);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await sendRequest(requestMehods.GET, "/user");
      setLoaded(true);

      const boards = data.user.boards;
      dispatch(loadBoards({ boards }));

      const tags = [];
      boards.forEach((board) => {
        board.tags.forEach((tag) => {
          tags.push({ id: tag._id, name: tag.name, boardId: board._id });
        });
      });
      dispatch(loadTags(tags));

      const columns = [];
      boards.forEach((board) => {
        board.columns.forEach((column) => {
          columns.push({ name: column, boardId: board._id });
        });
      });
      dispatch(loadColumns(columns));
      
      const tasks = [];
      boards.forEach((board) => {
        board.tags.forEach((tag) => {
          tag.tasks.forEach((task) => {
            tasks.push({ ...task, boardId: board._id, tagId: tag._id });
          });
        });
      });
      dispatch(loadTasks({ tasks }));
      dispatch(loadTasksAnalytics());
    };

    if(!loaded) getUser();
  });

  return (
    <div className="app md-text">
      <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute element={Home} />} />
            <Route path="/board/:boardId" element={<ProtectedRoute element={Board} />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
