import React, { useReducer } from 'react';
import axios from 'axios';
import HomeContext from './homeContext';
import homeReducer from './homeReducer';
import {
  ALL_POSTS,
  FOLLOWED_POSTS,
  POSTS_ERROR,
  USER_PROFILE,
  SEARCH_USERS,
} from '../types';

const HomeState = ({ children }) => {
  const initialState = {
    posts: [],
    profile: null,
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
        profile: state.profile,
        foundUsers: state.foundUsers,
        error: state.error,
        getAllPosts,
        getFollowedPosts,
        getProfile,
        findUser,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeState;
