import {
  SET_STORIES,
  LIKE_STORY,
  UNLIKE_STORY,
  LOADING_DATA,
  DELETE_STORY,
  POST_STORY,
  SET_STORY,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  stories: [],
  story: {},
  loading: false
};

export default function(state = initialState, action) {
  let index;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_STORIES:
      return {
        ...state,
        stories: action.payload,
        loading: false
      };
    case LIKE_STORY:
    case UNLIKE_STORY:
      index = state.stories.findIndex(
        story => story.storyId === action.payload.storyId
      );
      state.stories[index] = { ...state.stories[index], ...action.payload };
      if (state.story.storyId === action.payload.storyId) {
        state.story = { ...state.story, ...action.payload };
      }
      return {
        ...state
      };
    case DELETE_STORY:
      index = state.stories.findIndex(
        story => story.storyId === action.payload
      );
      state.stories.splice(index, 1);
      return {
        ...state
      };
    case POST_STORY:
      return {
        ...state,
        stories: [action.payload, ...state.stories]
      };
    case SET_STORY:
      return {
        ...state,
        story: action.payload
      };
    case SUBMIT_COMMENT:
      index = state.stories.findIndex(
        story => story.storyId === action.payload.storyId
      );
      let updatedStories = JSON.parse(JSON.stringify(state.stories));
      updatedStories[index].commentCount += 1;
      return {
        ...state,
        stories: [...updatedStories],
        story: {
          ...state.story,
          comments: [action.payload.comment, ...state.story.comments],
          commentCount: state.story.commentCount + 1
        }
      };
    default:
      return state;
  }
}
