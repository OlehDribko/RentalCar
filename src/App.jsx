import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";

import { fetchCar } from "./redux/operations.js";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Catalog from "./pages/Catalog/Catalog.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
      <div className="main-container"></div>
    </>
  );
}

export default App;
