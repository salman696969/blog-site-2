import {
  GET_ALL_BLOGS,
  STORE_ALL_BLOGS,
  GET_MY_BLOGS,
  STORE_MY_BLOGS,
  STORE_BLOG_COMMENTS,
  GET_BLOG_COMMENTS,
  GET_BLOG,
  STORE_BLOG,
  GET_USERS,
  STORE_USERS,
} from "../actionType";

export const getAllBlogs = (id, userId) => async (dispatch) => {
  let apiUrl = `http://localhost:3000/blogs`;

  let response = await fetch(apiUrl);

  let data = await response.json();

  // console.log(id);
  if (id === undefined) {
    id = "allBlogs";
  }

  if (id === "allBlogs") {
    dispatch({
      type: GET_ALL_BLOGS,

      payload: data,
    });

    dispatch({
      type: STORE_ALL_BLOGS,

      payload: data,
    });
  }
  // console.log(userId);
  if (id === "myBlogs") {
    data = data.filter((blog) => {
      // console.log(blog.blogger_id);
      return blog.blogger_id === parseInt(userId);
    });
    dispatch({
      type: GET_MY_BLOGS,

      payload: data,
    });

    dispatch({
      type: STORE_MY_BLOGS,

      payload: data,
    });
  }
};

export const getComments = (id) => async(dispatch)=>{
 let api_url = `http://localhost:3000/blog_details/${id}`
 let response = await fetch(api_url)
 let data = await response.json()
 console.log(data)
 dispatch({
  type: GET_BLOG_COMMENTS,
  payload: data,
});
dispatch({
  type:STORE_BLOG_COMMENTS,
  payload:data
})
} 

export const getBlog = (id) => async(dispatch)=>{
  let api_url = `http://localhost:3000/blogs/${id}`
  let response = await fetch(api_url)
  let data = await response.json()
  console.log(data)
  dispatch({
   type: GET_BLOG,
   payload: data,
 });
 dispatch({
   type:STORE_BLOG,
   payload:data
 })
 } 

 export const getUsers = (id) => async(dispatch)=>{
  let api_url = `http://localhost:3000/users`
  let response = await fetch(api_url)
  let data = await response.json()
  console.log(data)
  dispatch({
   type: GET_USERS,
   payload: data,
 });
 dispatch({
   type:STORE_USERS,
   payload:data
 })
 } 
