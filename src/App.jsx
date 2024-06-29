import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./components/Principal/LandingPage";
import Login from "./components/Login/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;
