import {
  CREATE_POST,
  CREATE_POST_REQUEST,
  POST_DISLIKE,
  POST_LIKE,
} from "@/app/actions/types";

const initialState = {
  posts: [],
  like: "",
  dislike: "",
  loading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_POST:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case POST_LIKE:
      return {
        ...state,
        loading: false,
        like: action.payload,
      };
    case POST_DISLIKE:
      return {
        ...state,
        loading: false,
        dislike: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
