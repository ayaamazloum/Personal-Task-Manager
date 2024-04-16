import "./styles/utilities.css";
import "./styles/colors.css";

import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Board from "./pages/Board";
import { useDispatch, useSelector } from "react-redux";
import { loadBoards } from "./Redux/boardSlice";
import { loadTasks } from "./Redux/taskSlice";
import { loadTasksAnalytics } from "./Redux/taskSlice";
import sendRequest from "./core/tools/remote/request";
import { requestMehods } from "./core/enums/requestMethods";

const App = () => {
  const dispatch = useDispatch();
  const boardState = useSelector((global) => global.board);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await sendRequest(requestMehods.GET, "/user");

      const boards = data.user.boards;
      
      dispatch(loadBoards({ boards }));
      
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

    if(boardState.boards.length === 0)  getUser();
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
