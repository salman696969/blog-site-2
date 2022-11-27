import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppContext from "../../../context/AppContext";
import {
  getAllBlogs,
  getCategory,
  getCategoryBlogs,
  getMyBlogs,
  getSearchBlogs,
  getUser,
} from "../../../redux/actions/blogs.action";
import Button from "../../atoms/Button";
import Label from "../../atoms/Label/Label";
import Input from "../../atoms/Input/Input";
import Blog from "../../molecules/Blog/Blog";
import AddBlog from "../AddBlog/AddBlog";
import Img from "../../atoms/Img/Img";

export default function BlogList() {
  let { allBlogs, allBlogs_loaded, categories } = useSelector(
    (state) => state.allBlogs
  );
  let { myBlogs, myBlogs_loaded } = useSelector((state) => state.allBlogs);
  let { user, user_loaded } = useSelector((state) => state.users);
  let { id } = useParams();
  let dispatch = useDispatch();
  let contextData = useContext(AppContext);
  let userId = sessionStorage.getItem("user-id");
  let [currentPage, SetCurrentPage] = useState(1);
  let [page, SetPage] = useState([]);
  let totalpages = 10;
  // let [title, setTitle] = useState();

  useEffect(() => {
   
    dispatch(getAllBlogs(id, userId, currentPage));
    dispatch(getMyBlogs(userId,currentPage));
    dispatch(getCategory());
    
  }, [allBlogs_loaded, myBlogs_loaded, currentPage]);

  useEffect(()=>{
    dispatch(getUser(userId));
  },[id])

  useEffect(() => {
    dispatch(getAllBlogs(id, userId,currentPage));
    dispatch(getCategory());
    // SetCurrentPage(1);
    // contextData.SetPage([]);
  }, []);

  const selectCategory = (category) => {
    contextData.setCategory(category);
  };

  useEffect(() => {
    dispatch(getCategoryBlogs(contextData.category,currentPage));
  }, [contextData.category]);

  const handleInputChange = (e) => {
    contextData.setTitle(e);
  };

  useEffect(() => {
    if (contextData.title == "") {
      dispatch(getAllBlogs());
    } else {
      dispatch(getSearchBlogs(contextData.title));
    }
  }, [contextData.title]);

  useEffect(() => {
    SetPage(Array.from(Array(totalpages + 1).keys()));
  }, []);

  return (
    <div className="relative">
      <div className="relative flex pt-20">
        <div className="p-5 w-full h-full md:basis-2/3">
          {id == "allBlogs" ? (
            <h1 className="text-4xl text-indigo-200 pl-2 font-serif max-mobile:text-2xl">
              All Blogs
            </h1>
          ) : null}
          {id == "myBlogs" ? (
            <h1 className="text-4xl text-indigo-200 pl-2 font-serif max-mobile:text-2xl">
              My Blogs
            </h1>
          ) : null}
          {id !== "addBlog" ? (
            id == "myBlogs" ? (
              myBlogs?.map((blog) => {
                return <Blog blog={blog} key={blog.id} />;
              })
            ) : (
              allBlogs?.map((blog) => {
                return <Blog blog={blog} key={blog.id} />;
              })
            )
          ) : (
            <AddBlog />
          )}
        </div>
        {allBlogs.length == 0 && id != "addBlog" ? (
          <div className="fixed top-72 left-96 text-white text-xl">
            No Blogs Available
          </div>
        ) : null}
        {id == "allBlogs" || id == null ? (
          <div className="basis-1/3 ml-8 mt-7 h-10 flex flex-wrap justify-center items-center max-mobile:hidden">
            <div className="fixed">
              <Label className="hidden" HTMLfor="search">
                Search:-
              </Label>
              <Input
                id="search"
                type="text"
                placeholder="Search Blogs"
                onChangeHandler={(e) => {
                  handleInputChange(e.target.value);
                }}
                className="text-white border border-black border-b-indigo-200 focus:outline-none py-1 bg-inherit border-b-2 focus:bg-inherit focus:border-b-4 text-lg"
              />
            </div>
            <div className="fixed flex flex-wrap justify-center items-center top-40 text-sm py-1">
              {categories?.map((category) => {
                return (
                  <Button
                    key={category}
                    onClickHandler={() => selectCategory(category)}
                    bg={
                      contextData.category === category
                        ? "rgb(0,0,0)"
                        : "rgb(255,255,255)"
                    }
                    text={
                      contextData.category === category
                        ? "rgb(255,255,255)"
                        : "rgb(0,0,0)"
                    }
                    className="font-bold border w-fit h-11 py-2 rounded-lg my-2 border-black mx-2 focus:border-white hover:bg-black hover:text-white"
                  >
                    {category}
                  </Button>
                );
              })}
            </div>
          </div>
        ) : null}
        {id == "myBlogs" ? (
          <div className="fixed right-20 top-40 flex flex-col justify-center items-center basis-1/3 text-white max-mobile:hidden max-lg:right-10 max-md:hidden">
            <Img src={user?.avatarImg} width="" height="" className="w-60" />
            <div>Name:-{user?.name}</div>
            <div>Email:-{user?.email}</div>
            <div>Username:-{user?.username}</div>
          </div>
        ) : null}
      </div>
      {id !== "addBlog" ? (
        <div className={allBlogs.length == 0? "text-white absolute top-96 left-96 pt-40" :"text-white flex justify-center absolute w-full bottom-0"}>
          <button
            className="mx-4"
            onClick={() => {
              SetCurrentPage(1);
            }}
            disabled={currentPage === 1 ? true : false}
          >
            {" "}
            First Page
          </button>
          <button
            className="mx-4"
            onClick={() => {
              SetCurrentPage(currentPage - 1);
            }}
            disabled={currentPage === 1 ? true : false}
          >
            Prev
          </button>
          {page.map((item) => {
            if (
              item !== 0 &&
              item >= currentPage - 1 &&
              item <= currentPage + 1
            ) {
              return (
                <button
                  className={`text-white mx-2 px-2 ${
                    item === currentPage ? "bg-gray-600" : "bg-black"
                  }`}
                  onClick={() => {
                    SetCurrentPage(item);
                  }}
                >
                  {item}
                </button>
              );
            }
          })}
          <button className="">...</button>
          {page.map((item) => {
            if (item !== 0 && item >= totalpages - 1) {
              return (
                <button
                  className={`text-white mx-2 px-2 ${
                    item === currentPage ? "bg-gray-500" : "bg-black"
                  }`}
                  onClick={() => {
                    SetCurrentPage(item);
                  }}
                >
                  {item}
                </button>
              );
            }
          })}
          <button
            onClick={() => {
              SetCurrentPage(currentPage + 1);
            }}
            disabled={currentPage === totalpages ? true : false}
          >
            Next
          </button>
          <button
            className="mx-4"
            onClick={() => {
              SetCurrentPage(10);
            }}
            disabled={currentPage === 10 ? true : false}
          >
            {" "}
            Last Page
          </button>
        </div>
      ) : null}
    </div>
  );
}
