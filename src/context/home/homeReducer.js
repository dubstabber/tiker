import {
  ALL_POSTS,
  FOLLOWED_POSTS,
  POSTS_ERROR,
  USER_PROFILE,
  PROFILE_ERROR,
  SEARCH_USERS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ALL_POSTS:
    case FOLLOWED_POSTS:
      return {
        ...state,
        posts: action.payload,
        profile: null,
        foundUsers: null,
      };
    case POSTS_ERROR:
      return {
        ...state,
        posts: [],
        error: action.payload,
      };
    case USER_PROFILE:
      return {
        ...state,
        posts: [],
        profile: action.payload,
        foundUsers: null,
      };
    default:
      return state;
  }
};
