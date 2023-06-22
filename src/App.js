import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Blog from "./components/Blog/Blog";
import Genre from "./components/Genre/Genre";
import Form from "./components/Form/Form";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";

import './styles.css';
import { useSelector } from "react-redux";
import Search from "./components/Search/Search";

const App = () => {
    const user = useSelector((state) => state.users.userData);
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/genre" element={<Genre />} />
                <Route path="/create-blog" element={<Form />} />
                <Route path="/blogs/:id" element={<Blog />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
            </Routes>

        </BrowserRouter>
    )
}

export default App
