import AppContext from "./AppContext";

import React, { useState } from "react";

export default function AppState(props) {
  let [myBlogs, setMyBlogs] = useState(false);

  let [allBlog, setAllBlogs] = useState(true);

  let [liked, setLiked] = useState(false);

  let [showComment, setshowComment] = useState(false);
  //   let [user, setUser] = useState(true)

  return (
    <AppContext.Provider
      value={{ myBlogs, setMyBlogs, allBlog, setAllBlogs, liked, setLiked,showComment,setshowComment }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
