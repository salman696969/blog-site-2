import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "../../atoms/TextArea/TextArea";
import Button from "../../atoms/Button/Button";
import { Link } from "react-router-dom";

export default function CommentSection(props) {
  let Usercomment = "";
  let { comments } = useSelector((state) => state.comments);
  let allComment = comments.comment;

  const onChangeHandler = (e) => {
    Usercomment = e.target.value;
  };

  const postComment = async () => {
    let data = {
      blogger_id: sessionStorage.getItem("user-id"),
      username : sessionStorage.getItem("username"),
      date_created: new Date(),
      content: Usercomment,
    };
    if (allComment !== undefined) {
      let allComments = [];
      allComments = [...allComment, data];
      let res = await fetch(
        `http://localhost:3000/blog_details/${props.blog?.id}`,
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
        body: JSON.stringify({ comment: [data], id: props.blog?.id }),
      });
      let comment_data = await res.json();
      props.Opencomment();
      console.log(comment_data);
    }
  };

  return (
    <div>
      {/* <div>
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
      </div> */}
      <div
        id="medium-modal"
        tabindex="-1"
        class={
          props.showComment
            ? "flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full justify-center mt-28"
            : "hidden"
        }
      >
        <div class="relative w-full max-w-lg h-full md:h-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 opacity-95">
            <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                Comments
              </h3>
              <Button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="medium-modal"
                onClickHandler={() => props.Closecomment()}
                ariaLabel={props.blog?.id}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </Button>
            </div>

            <div class="p-6 space-y-6 text-white max-h-96 overflow-y-auto">
              {allComment?.map((comment) => {
                return (
                  <div key={comment.content}>
                    <span className="mr-2">{comment.username}:</span>
                    <span>{comment.content}</span>
                  </div>
                );
              })}
            </div>

            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <TextArea
                rows="1"
                className="w-full rounded-lg font-bold min-h-fit py-2 px-1 text-lg"
                onChangeHandler={(e) => onChangeHandler(e)}
              ></TextArea>
              <Button
                className="ml-2"
                bg="#4DC12F"
                onClickHandler={() => {
                  postComment();
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
