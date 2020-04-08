import {
  SET_STORIES,
  LOADING_DATA,
  LIKE_STORY,
  UNLIKE_STORY,
  DELETE_STORY,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  POST_STORY,
  SET_STORY,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

// Get all stories
export const getStories = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/stories")
    .then((res) => {
      dispatch({ type: SET_STORIES, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_STORIES, payload: [] });
    });
};

// Get one story

export const getStory = (storyId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/story/${storyId}`)
    .then((res) => {
      dispatch({ type: SET_STORY, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Post a story
export const postStory = (newStory) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/story", newStory)
    .then((res) => {
      dispatch({
        type: POST_STORY,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Like a story
export const likeStory = (storyId) => (dispatch) => {
  axios
    .get(`/story/${storyId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_STORY,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Unlike a story
export const unlikeStory = (storyId) => (dispatch) => {
  axios
    .get(`/story/${storyId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_STORY,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Submit a comment
export const submitComment = (storyId, commentData) => (dispatch) => {
  axios
    .post(`/story/${storyId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: { storyId: storyId, comment: res.data },
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
      console.log(err);
    });
};

// Delete a story
export const deleteStory = (storyId) => (dispatch) => {
  axios
    .delete(`/story/${storyId}`)
    .then(() => {
      dispatch({ type: DELETE_STORY, payload: storyId });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get user's story list
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_STORIES,
        payload: res.data.stories,
      });
    })
    .catch((err) => {
      dispatch({ type: SET_STORIES, payload: null });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
