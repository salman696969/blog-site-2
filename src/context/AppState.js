import AppContext from "./AppContext";

import React, { useState } from "react";

export default function AppState(props) {
  let [myBlogs, setMyBlogs] = useState(false);

  let [allBlog, setAllBlogs] = useState(true);

  let [liked, setLiked] = useState(false);

  let [category, setCategory] = useState();
  //   let [user, setUser] = useState(true)
  let [title, setTitle] = useState();

  // let [currentPage, SetCurrentPage] = useState(1);
  // let [page, SetPage] = useState([]);
  return (
    <AppContext.Provider
      value={{
        myBlogs,
        setMyBlogs,
        allBlog,
        setAllBlogs,
        liked,
        setLiked,
        category,
        setCategory,
        title,
        setTitle,
        // currentPage,
        // SetCurrentPage,
        // page,
        // SetPage
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
