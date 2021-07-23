import {
  ALL_POSTS,
  FOLLOWED_POSTS,
  POSTS_ERROR,
  USER_PROFILE,
  PROFILE_ERROR,
  FOLLOWED_USERS,
  SUGGESTED_USERS,
  SEARCH_USERS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
        allPosts: 2,
        profile: null,
        foundUsers: null,
      };
    case FOLLOWED_POSTS:
      return {
        ...state,
        posts: action.payload,
        allPosts: 1,
        profile: null,
        foundUsers: null,
      };
    case FOLLOWED_USERS:
      return {
        ...state,
        followed: action.payload,
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
    default:
      return state;
  }
};
