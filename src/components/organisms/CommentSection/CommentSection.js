import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "../../atoms/TextArea/TextArea";
import Button from "../../atoms/Button/Button";

export default function CommentSection(props) {
  let Usercomment = "";
  let { comments } = useSelector((state) => state.comments);
  let allComment = comments.comment;
  console.log(allComment);
  const onChangeHandler = (e) => {
    Usercomment = e.target.value;
  };

  const postComment = async () => {
    let data = {
      blogger_id: sessionStorage.getItem("user-id"),
      date_created: new Date(),
      content: Usercomment,
    };
    if (allComment !== undefined) {
      let allComments = [];
      allComments = [...allComment, data];
      let res = await fetch(
        `http://localhost:3000/blog_details/${props.blog.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ comment: allComments }),
        }
      );

      let comment_data = await res.json();
      props.Opencomment();
      console.log(comment_data);
    } else {
      console.log(allComment);
      let allComment2 = [];
      allComment2.push(data);
      let res = await fetch(`http://localhost:3000/blog_details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: [data], id: props.blog.id }),
      });
      let comment_data = await res.json();
      props.Opencomment();
      console.log(comment_data);
    }
  };

  return (
    <div>
      <div>
        <TextArea onChangeHandler={(e) => onChangeHandler(e)}></TextArea>
        <Button
          className="ml-2"
          onClickHandler={() => {
            postComment();
          }}
        >
          Post
        </Button>
        <Button onClickHandler={() => props.Closecomment()}>Close</Button>
      </div>
    </div>
  );
}
