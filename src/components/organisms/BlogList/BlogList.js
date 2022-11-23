import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppContext from "../../../context/AppContext";
import {
  getAllBlogs,
  getCategory,
  getCategoryBlogs,
} from "../../../redux/actions/blogs.action";
import Button from "../../atoms/Button";
import Blog from "../../molecules/Blog/Blog";
import AddBlog from "../AddBlog/AddBlog";

export default function BlogList() {
  let { allBlogs, allBlogs_loaded, categories } = useSelector(
    (state) => state.allBlogs
  );
  let { id } = useParams();
  let dispatch = useDispatch();
  let contextData = useContext(AppContext);
  let userId = sessionStorage.getItem("user-id");

  useEffect(() => {
    dispatch(getAllBlogs(id, userId));
    dispatch(getCategory());
  }, [id, allBlogs_loaded]);

  const selectCategory = (category) => {
    contextData.setCategory(category);
  };

  useEffect(() => {
    dispatch(getCategoryBlogs(contextData.category));
  }, [contextData.category]);

  // console.log(tr)
  // console.log(contextData.category)
  allBlogs?.sort(function (a, b) {
    let c = new Date(a.date);
    let d = new Date(b.date);
    return c - d;
  });
  allBlogs.reverse();

  return (
    <div className="relative font-serif flex">
      <div className="p-5 border basis-2/3">
        {id !== "addBlog" ? (
          allBlogs?.map((blog) => {
            return <Blog blog={blog} key={blog.id} />;
          })
        ) : (
          <AddBlog />
        )}
      </div>
      {id == "allBlogs" || id == "myBlogs" ? (
        <div className="basis-1/3 ml-8 mt-7 h-10 flex flex-wrap justify-center items-center">
          <div className="fixed flex flex-wrap justify-center items-center top-20">
            {categories?.map((category) => {
              return (
                <Button
                  key={category}
                  onClickHandler={() => selectCategory(category)}
                  bg="rgb(255,255,255)"
                  text="rgb(0,0,0)"
                  className="border w-fit h-11 px-5 py-2 rounded-lg my-2 border-black mx-3"
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
