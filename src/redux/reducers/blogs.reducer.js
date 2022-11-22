import {
  GET_ALL_BLOGS,
  STORE_ALL_BLOGS,
  GET_MY_BLOGS,
  STORE_MY_BLOGS,
  GET_BLOG_COMMENTS,
  STORE_BLOG_COMMENTS,
  GET_BLOG,
  STORE_BLOG,
} from "../actionType";

const InitialState = {
  allBlogs: [],
  allBlogs_loaded: false,
  comments :[],
  blog:[]
};

export const blogReducer = (state = InitialState, action) => {
  switch (action.type) {
    case GET_ALL_BLOGS:
      return {
        ...state,
        allBlogs: action.payload,
      };
    case STORE_ALL_BLOGS:
      return {
        ...state,
        allBlogs: action.payload,
        allBlogs_loaded: false,
      };
    case GET_MY_BLOGS:
      return {
        ...state,
        allBlogs: action.payload,
        allBlogs_loaded: false,
      };
    case STORE_MY_BLOGS:
      return {
        ...state,
        allBlogs: action.payload,
        allBlogs_loaded: false,
      };
      case GET_BLOG:
      return {
        ...state,
        blog: action.payload,
       
      };
    case STORE_BLOG:
      return {
        ...state,
        blog: action.payload,
      };
      

    default:
      return state;
  }
};

  export const commentsReducer = (state = InitialState, action) => {
    switch (action.type) {
    case GET_BLOG_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
      case STORE_BLOG_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
      default:
      return state;
    }
  }