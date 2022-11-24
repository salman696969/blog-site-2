import {
  GET_ALL_BLOGS,
  STORE_ALL_BLOGS,
  GET_MY_BLOGS,
  STORE_MY_BLOGS,
  GET_BLOG_COMMENTS,
  STORE_BLOG_COMMENTS,
  GET_BLOG,
  STORE_BLOG,
  GET_USERS,
  GET_CATEGORY,
  STORE_CATEGORY,
  GET_CATEGORY_BLOGS,
  STORE_CATEGORY_BLOGS,
  GET_SEARCH_BLOGS,
  STORE_SEARCH_BLOGS,
  STORE_USERS,
  STORE_USER,
  GET_USER,
} from "../actionType";

const InitialState = {
  allBlogs: [],
  allBlogs_loaded: false,
  comments: [],
  blog: [],
  users: [],
  users_loaded: false,
  categories: [],
  category_loaded: [],
  user:[]
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
        allBlogs_loaded: true,
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
        users_loaded: true,
      };
    case GET_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case STORE_CATEGORY:
      return {
        ...state,
        categories: action.payload,
        category_loaded: true,
      };
    case GET_CATEGORY_BLOGS:
      return {
        ...state,
        allBlogs: action.payload,
      };
    case STORE_CATEGORY_BLOGS:
      return {
        ...state,
        allBlogs: action.payload
      };
      case GET_SEARCH_BLOGS:
      return {
        ...state,
        allBlogs: action.payload,
      };
    case STORE_SEARCH_BLOGS:
      return {
        ...state,
        allBlogs: action.payload
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
};

export const usersReducer = (state = InitialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case STORE_USERS:
      return {
        ...state,
        users: action.payload,
      };
      case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case STORE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
