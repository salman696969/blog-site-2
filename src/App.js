import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Button from "./components/atoms/Button";
import Login from "./components/molecules/Login/Login";
import Signup from "./components/molecules/Signup/Signup";
import LoginHolder from "./components/organisms/LoginHolder/LoginHolder";
import HomePage from "./components/pages/HomePage/HomePage";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import BlogList from "./components/organisms/BlogList/BlogList";
import AddBlog from "./components/organisms/AddBlog/AddBlog";
import RequireAuth from "./utils/RequireAuth"
import Navbar from "./components/organisms/Navbar/Navbar";

export default function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />}></Route>
          <Route element={<RequireAuth />}>
            <Route path="/:id" element={<BlogList />} />
          </Route>
          {/* <Route path="/allBlogs" element={<BlogList />} /> */}
        
        <Route path="auth" element={<AuthPage />}>
          <Route
            index
            element={
              <LoginHolder>
                <Login />
              </LoginHolder>
            }
          />
          <Route
            path="login"
            element={
              <LoginHolder>
                <Login />
              </LoginHolder>
            }
          />
          <Route
            path="signup"
            element={
              <LoginHolder>
                <Signup />
              </LoginHolder>
            }
          />
        </Route>
        {/* <Route path="blog/:id" element={<BlogPage/>}/> */}
      </Routes>
    </React.Fragment>
  );
}
