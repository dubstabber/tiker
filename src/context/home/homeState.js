import React, { useReducer } from 'react';
import axios from 'axios';
import HomeContext from './homeContext';
import homeReducer from './homeReducer';
import {
  ALL_POSTS,
  FOLLOWED_POSTS,
  POSTS_ERROR,
  USER_PROFILE,
  FOLLOWED_USERS,
  SUGGESTED_USERS,
  SEARCH_USERS,
} from '../types';

const HomeState = ({ children }) => {
  const initialState = {
    posts: [],
    allPosts: 2,
    profile: null,
    followed: null,
    suggested: null,
    foundUsers: null,
    error: null,
  };

  const [state, dispatch] = useReducer(homeReducer, initialState);

  const getAllPosts = async () => {
    try {
      const res = await axios.get('/getPosts');

      dispatch({ type: ALL_POSTS, payload: res.data });
    } catch (err) {
      dispatch({ type: POSTS_ERROR, payload: err.response.msg });
    }
  };

  const getFollowedPosts = async () => {
    try {
      //   const res = await axios.get('/getPosts');
      console.log('implement "getFollowedPosts"');
      //   dispatch({ type: FOLLOWED_POSTS, payload: res.data });
    } catch (err) {
      dispatch({ type: POSTS_ERROR, payload: err.response.msg });
    }
  };

  const getProfile = async (userId) => {
    try {
      const res = await axios.get('/getUser/' + userId);

      dispatch({ type: USER_PROFILE, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const getFollowedUsers = async () => {
    try {
      const res = await axios.get('/getFollowing/');
    } catch (err) {
      console.log(err);
    }
  };

  const followUser = async (username) => {
    try {
      const res = await axios.put('/follow/' + username);
    } catch (err) {
      console.log(err);
    }
  };

  const findUser = async (username) => {
    try {
      console.log('implement "findUser"');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HomeContext.Provider
      value={{
        posts: state.posts,
        allPosts: state.allPosts,
        profile: state.profile,
        foundUsers: state.foundUsers,
        error: state.error,
        getAllPosts,
        getFollowedPosts,
        getProfile,
        followUser,
        findUser,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeState;
