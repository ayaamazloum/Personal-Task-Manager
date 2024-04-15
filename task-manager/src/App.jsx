import "./styles/utilities.css";
import "./styles/colors.css";

import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Board from "./pages/Board";
import { Provider } from "react-redux";
import { store } from "./Redux/store";;

const App = () => {
  return (
    <div className="app md-text">
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute element={Home} />} />
            <Route path="/board/:id" element={<ProtectedRoute element={Board} />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
