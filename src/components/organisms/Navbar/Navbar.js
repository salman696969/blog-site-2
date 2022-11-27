import React, { useContext } from "react";
import StyledButton from "../../atoms/Button/StyledButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Button from "../../atoms/Button";
import AppContext from "../../../context/AppContext";
import { clear } from "@testing-library/user-event/dist/clear";

export default function Navbar() {
  let contextData = useContext(AuthContext);
  let contextAppData = useContext(AppContext);
  let navigate = useNavigate();
  let { id } = useParams();
  // console.log(id);
  const onClickHandler = () => {
    contextData.setLoggedIn(false);
    sessionStorage.clear();
    localStorage.clear();
    alert("logged out");
  };
  const showAllBlogs = () => {
    contextAppData.setMyBlogs(false);
  };
  const showMyBlogs = () => {
    contextAppData.setMyBlogs(true);
  };
  const addBlog = () => {
    navigate("/addBlog");
  };
  return (
    <div className="bg-black text-white px-10 flex min-w-screen justify-between py-2 font-serif border-b-4 border-white border-opacity-50">
      <div className="">
        <Link to="/allBlogs">
          <Button bg="inherit" text="inherit" onClickHandler={showAllBlogs}>
            All Blogs
          </Button>
        </Link>

        <Link to="myBlogs">
          {sessionStorage.getItem("login") ? (
            <Button
              bg="inherit"
              text="inherit"
              disabled={!sessionStorage.getItem("login")}
              onClickHandler={showMyBlogs}
            >
              My Blogs
            </Button>
          ) : null}
        </Link>
        <Link to="addBlog">
          {sessionStorage.getItem("login") ? (
            <Button
              bg="inherit"
              text="inherit"
              disabled={!sessionStorage.getItem("login")}
              onClickHandler={addBlog}
            >
              Add Blog
            </Button>
          ) : null}
        </Link>
      </div>
      <div className="flex items-center">
        <span className="mx-2">{sessionStorage.getItem("username")}</span>
        {sessionStorage.getItem("login") ? (
          <Link to={"userSettings/" + sessionStorage.getItem("user-id")}>
            <Button ariaLabel="settings" className="" bg="inherit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill=""
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Button>
          </Link>
        ) : null}
        {sessionStorage.getItem("login") ? (
          <Link to="/auth/login">
            <Button
              onClickHandler={() => {
                onClickHandler();
              }}
              className=""
            >
              Logout
            </Button>
          </Link>
        ) : (
          <Link to="/auth/signup">
            <Button bg="#404040" className="">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
