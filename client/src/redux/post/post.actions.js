import { GET_POSTS, CREATE_POST, REQUEST_SENT, LIKE_POST, UNLIKE_POST } from "./post.types";
import axios from "axios";

export const getPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_SENT,
    });
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
    dispatch({
      type: REQUEST_SENT,
    });
    const token = getState().auth.user.token;

    const body = { text };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post("/api/posts", body, config);

    console.log("Post from action: ", res.data);

    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch, getState) => {
  try {
    const token = getState().auth.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(config)

    const { data } = await axios.put(`/api/posts/like/${id}`, {}, config);
    const likes = data;
    console.log('Likes: ', likes)

    // Getting back the post that was liked but the posts array is not being updated with the liked post in the
    // map function below
    const posts = getState().post.posts.map((post) => {
      if (post._id === id) {
        post.likes = likes;
      }

      return post;
    });

    console.log("New Posts with updated likes: ", posts);

    dispatch({
      type: LIKE_POST,
      payload: posts,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const unlikePost = (id) => async (dispatch, getState) => {
  try {
    const token = getState().auth.user.token;

    console.log("Token: ", token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(config)

    const { data } = await axios.post(`/api/posts/unlike/${id}`, {}, config);
    const likes = data;
    console.log('Likes: ', likes)

    // Getting back the post that was liked but the posts array is not being updated with the liked post in the
    // map function below
    const posts = getState().post.posts.map((post) => {
      if (post._id === id) {
        post.likes = likes;
      }

      return post;
    });

    console.log("New Posts with updated likes: ", posts);

    dispatch({
      type: UNLIKE_POST,
      payload: posts,
    });
  } catch (error) {
    console.log(error.message);
  }
};
