import { BASE_URL } from "@/baseUrl";
import {
  CREATE_POST,
  FOLLOW_USER,
  FOLLOWING_USER,
  POST_DISLIKE,
  POST_LIKE,
  REGISTER_REQUEST,
  USER_REGISTER,
} from "./types";
import { LOGIN_REQUEST, USER_LOGIN } from "./types";

import axios from "axios";
import { toast } from "react-toastify";

export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    console.log("BASE_URL", BASE_URL);
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    dispatch({ type: USER_REGISTER, payload: response.data });
    toast.success("Registration successful!");
  } catch (error) {
    console.log("response", error);
    dispatch({
      type: USER_REGISTER,
      payload: error.response?.data?.message || "Something went wrong",
    });
    toast.error("Something went wrong");
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("username", data.username);

      dispatch({
        type: USER_LOGIN,
        payload: { token: data.token },
      });
      toast.success("Login successful!");
    } else {
      toast.error("Invalid email or password");
    }
  } catch (error) {
    toast.error("An error occurred. Please try again.");
  }
};

export const createPost = (formData) => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to create a post.");
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}/posts/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: CREATE_POST, payload: response.data });
    dispatch(getPosts());
  } catch (error) {
    console.error("Error creating post:", error);
    dispatch({ type: CREATE_POST, payload: error.message });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const response = await axios.get(`${BASE_URL}/posts/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("responee", response);
    dispatch({
      type: CREATE_POST,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const likePosts = (payload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const response = await axios.post(`${BASE_URL}/likes/like`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("responee", response);
    dispatch({
      type: POST_LIKE,
      payload: response.data,
    });
    dispatch(getPosts());
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const dislikePosts = (payload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const response = await axios.post(`${BASE_URL}/likes/unlike`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("responee", response);
    dispatch({
      type: POST_DISLIKE,
      payload: response.data,
    });
    dispatch(getPosts());
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const followUser = (payload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const response = await axios.post(`${BASE_URL}/follows/follow`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("responee", response);
    dispatch({
      type: FOLLOW_USER,
      payload: response.data,
    });
    dispatch(getPosts());
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const followingUser = (payload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const response = await axios.post(`${BASE_URL}/follows/unfollow`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("responee", response);
    dispatch({
      type: FOLLOWING_USER,
      payload: response.data,
    });
    dispatch(getPosts());
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
