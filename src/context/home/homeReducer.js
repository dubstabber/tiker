import {
  ALL_POSTS,
  FOLLOWED_POSTS,
  POSTS_ERROR,
  USER_PROFILE,
  PROFILE_ERROR,
  FOLLOWED_USERS,
  SUGGESTED_USERS,
  SEARCH_USERS,
  CLEAR,
} from '../types';

const homeReducer = (state, action) => {
  switch (action.type) {
    case ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
        allPosts: 2,
        profile: null,
        foundUsers: [],
      };
    case FOLLOWED_POSTS:
      return {
        ...state,
        posts: action.payload,
        allPosts: 1,
        profile: null,
        foundUsers: [],
      };
    case FOLLOWED_USERS:
      return {
        ...state,
        followed: action.payload,
      };
    case SUGGESTED_USERS:
      return {
        ...state,
        suggested: action.payload,
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
        allPosts: 0,
        profile: action.payload,
        foundUsers: null,
      };
    case CLEAR:
      return {
        ...state,
        posts: [],
        profile: null,
        followed: [],
        suggested: [],
        foundUsers: [],
        error: null,
      };
    default:
      return state;
  }
};

export default homeReducer;
