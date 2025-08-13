import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";

import HomePage from "./pages/HomePage/HomePage.jsx";
import Catalog from "./pages/Catalog/Catalog.jsx";
import CarDetailsPage from "./pages/CarDetailsPage/CarDetailsPage.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog:id" element={<CarDetailsPage />} />
      </Routes>
      <div className="main-container"></div>
    </>
  );
}

export default App;
