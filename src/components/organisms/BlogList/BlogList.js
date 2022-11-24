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
  let [title, setTitle] = useState();

  useEffect(() => {
    dispatch(getAllBlogs(id, userId));
    dispatch(getMyBlogs(userId));
    dispatch(getCategory());
    dispatch(getUser(userId));
  }, [id, allBlogs_loaded, myBlogs_loaded]);

  useEffect(() => {
    dispatch(getAllBlogs(id, userId));
    dispatch(getCategory());
  }, []);

  const selectCategory = (category) => {
    contextData.setCategory(category);
  };

  useEffect(() => {
    dispatch(getCategoryBlogs(contextData.category));
  }, [contextData.category]);

  const handleInputChange = (e) => {
    setTitle(e);
  };

  useEffect(() => {
    if (title == "") {
      dispatch(getAllBlogs());
    } else {
      dispatch(getSearchBlogs(title));
    }
  }, [title]);

  return (
    <div className="relative font-serif flex">
      <div className="p-5 basis-2/3">
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
        <div className="fixed top-40 left-20">No Blogs Available</div>
      ) : null}
      {id == "allBlogs" || id == null ? (
        <div className="basis-1/3 ml-8 mt-7 h-10 flex flex-wrap justify-center items-center">
          <div className="fixed">
            <Label className="hidden" HTMLfor="search">
              Search:-
            </Label>
            <Input
              id="search"
              type="text"
              placeholder="Search Blog"
              onChangeHandler={(e) => {
                handleInputChange(e.target.value);
              }}
              className="px-2 py-1 focus:outline-none focus:border-b-2 border-b-black"
            />
          </div>
          <div className="fixed flex flex-wrap justify-center items-center top-36">
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
                  className="border w-fit h-11 px-5 py-2 rounded-lg my-2 border-black mx-3"
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>
      ) : null}
      {id == "myBlogs" ? (
        <div className="flex flex-col justify-center items-center basis-1/3">
          <Img src={user?.avatarImg} width="" height="" className="w-60"/>
          <div>Name:-{user?.name}</div>
          <div>Email:-{user?.email}</div>
          <div>Username:-{user?.username}</div>
        </div>
      ) : null}
    </div>
  );
}
