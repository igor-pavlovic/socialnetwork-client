import {
  SET_STORIES,
  LOADING_DATA,
  LIKE_STORY,
  UNLIKE_STORY,
  DELETE_STORY
} from "../types";
import axios from "axios";

// Get all stories
export const getStories = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/stories")
    .then(res => {
      dispatch({ type: SET_STORIES, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SET_STORIES, payload: [] });
    });
};

// Like a story
export const likeStory = storyId => dispatch => {
  axios
    .get(`/story/${storyId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_STORY,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Unlike a story
export const unlikeStory = storyId => dispatch => {
  axios
    .get(`/story/${storyId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_STORY,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Delete a story
export const deleteStory = storyId => dispatch => {
  axios
    .delete(`/story/${storyId}`)
    .then(() => {
      dispatch({ type: DELETE_STORY, payload: storyId });
    })
    .catch(err => console.log(err));
};
