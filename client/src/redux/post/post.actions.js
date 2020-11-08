import { GET_POSTS, CREATE_POST } from "./post.types";
import axios from "axios";

export const getPosts = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/posts", config);

    dispatch({
      type: GET_POSTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (text) => async (dispatch, getState) => {
  try {
    const token = getState().auth.user.token;

    const body = { text };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const post = await axios.post("/api/posts", body, config).data;

    dispatch({
      type: CREATE_POST,
      payload: post,
    });
  } catch (error) {
    console.log(error);
  }
};
