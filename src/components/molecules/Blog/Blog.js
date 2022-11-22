import React, { useContext, useEffect, useState } from "react";
import Img from "../../atoms/Img/Img";
import Button from "../../atoms/Button/Button";
import AuthContext from "../../../context/AuthContext";
import LikeButton from "../../atoms/LikeButton/LikeButton";

import CommentSection from "../../organisms/CommentSection/CommentSection";

import { getComments } from "../../../redux/actions/blogs.action";
import { useDispatch, useSelector } from "react-redux";
import AppContext from "../../../context/AppContext";
export default function Blog({ blog }) {
  const addLike = async (addLike) => {
    let res = await fetch(`http://localhost:3000/blogs/${blog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: addLike }),
    });
    let data = await res.json();
    console.log(data);
  };
  let arr;
  let [liked, setLiked] = useState(
    blog.likes.filter((like) => like == sessionStorage.getItem("user-id"))
      .length
      ? true
      : false
  );

  const likeBlog = () => {
    // console.log("clicked");

    if (liked) {
      setLiked(false);
      arr = blog.likes.filter((like) => {
        return like != sessionStorage.getItem("user-id");
      });
    } else {
      setLiked(true);
      arr = blog.likes;
      arr.push(parseInt(sessionStorage.getItem("user-id")));
    }

    function removeDuplicates(arr) {
      return [...new Set(arr)];
    }

    blog.likes = removeDuplicates(arr);
    addLike(removeDuplicates(arr));
  };

  let dispatch = useDispatch();
  let contextData = useContext(AppContext);
  let [showComment, setshowComment] = useState(false);

  const Opencomment = () => {
    setshowComment(true);
    dispatch(getComments(blog.id));
  };

  const Closecomment = () => {
    setshowComment(false);
  };

  return (
    <div>
      <div className=" border my-4 border-black flex justify-between">
        <div className="w-3/4 min-h-40 m-3">
          <div>{blog.title}</div>
          <div>{blog.id}</div>
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          <div>{blog.likes.length}</div>
          <div>{blog.date_created}</div>

          <div>
            {blog.category.map((cat) => (
              <span key={cat}>{cat}</span>
            ))}
          </div>
          <LikeButton
            liked={liked}
            onClickHandler={likeBlog}
            disabled={!sessionStorage.login}
          >
            Like
          </LikeButton>
          <Button className="ml-1" onClickHandler={Opencomment}>
            Comment
          </Button>
          <div>
            {showComment ? (
              <CommentSection
                blog={blog}
                Opencomment={Opencomment}
                Closecomment={Closecomment}
              />
            ) : null}
          </div>
        </div>

        <div className="m-3">
          <Img src={blog.blog_img} alt={blog.title} width="200px" />
        </div>
      </div>
    </div>
  );
}
