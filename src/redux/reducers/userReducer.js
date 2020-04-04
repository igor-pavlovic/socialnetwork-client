import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_STORY,
  UNLIKE_STORY
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...action.payload,
        loading: false,
        authenticated: true
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_STORY:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.userHandle,
            storyId: action.payload.storyId
          }
        ]
      };
    case UNLIKE_STORY:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.storyId !== action.payload.storyId
        )
      };
    default:
      return state;
  }
}
