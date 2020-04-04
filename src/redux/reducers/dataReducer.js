import {
  SET_STORIES,
  LIKE_STORY,
  UNLIKE_STORY,
  LOADING_DATA,
  DELETE_STORY
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
      state.stories[index] = action.payload;
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
    default:
      return state;
  }
}
