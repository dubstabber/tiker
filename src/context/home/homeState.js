import React, { useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import HomeContext from './homeContext';
import homeReducer from './homeReducer';
import AuthContext from '../auth/authContext';
import DialogContext from '../dialog/dialogContext';
import {
  ALL_POSTS,
  FOLLOWED_POSTS,
  POSTS_ERROR,
  USER_PROFILE,
  PROFILE_ERROR,
  FOLLOWED_USERS,
  FOLLOWED_FAIL,
  SUGGESTED_USERS,
  SUGGESTED_FAIL,
  SEARCH_USERS,
  SEARCH_USERS_FAIL,
  FOLLOW_ERROR,
  CLEAR,
} from '../types';

const HomeState = ({ children }) => {
  const initialState = {
    posts: [],
    allPosts: 2,
    profile: null,
    followed: [],
    suggested: [],
    foundUsers: null,
    error: null,
  };

  const [state, dispatch] = useReducer(homeReducer, initialState);
  const { showModalDialog } = useContext(DialogContext);
  const { isAuth, loadUser } = useContext(AuthContext);

  useEffect(() => {
    getAllPosts();
    getFollowedUsers();
    getSuggestedUsers();
    // eslint-disable-next-line
  }, [isAuth]);

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
      if (isAuth) {
        const res = await axios.get('/getFollowedPosts');

        dispatch({ type: FOLLOWED_POSTS, payload: res.data });
      }
    } catch (err) {
      dispatch({ type: POSTS_ERROR, payload: err.response.msg });
    }
  };

  const getProfile = async (userId) => {
    try {
      const res = await axios.get('/getUser/' + userId);

      dispatch({ type: USER_PROFILE, payload: res.data });
    } catch (err) {
      dispatch({ type: PROFILE_ERROR, payload: err.response.msg });
    }
  };

  const getFollowedUsers = async () => {
    try {
      if (isAuth) {
        const res = await axios.get('/getFollowing/');

        dispatch({ type: FOLLOWED_USERS, payload: res.data });
      }
    } catch (err) {
      dispatch({ type: FOLLOWED_FAIL, payload: err.response.msg });
    }
  };

  const getSuggestedUsers = async () => {
    try {
      let res;
      if (isAuth) {
        res = await axios.get('/getSuggestedUsers');
      } else {
        res = await axios.get('/getUsers/5');
      }
      dispatch({ type: SUGGESTED_USERS, payload: res.data });
    } catch (err) {
      dispatch({ type: SUGGESTED_FAIL, payload: err.response.msg });
    }
  };

  const followUser = async (username) => {
    try {
      if (isAuth) {
        await axios.put('/follow/' + username);
        loadUser();
        getFollowedUsers();
        getSuggestedUsers();
      } else {
        showModalDialog();
      }
    } catch (err) {
      dispatch({ type: FOLLOW_ERROR, payload: err.response.msg });
    }
  };

  const findUser = async (username) => {
    try {
      const res = await axios.get('/searchUsers/' + username);

      dispatch({ type: SEARCH_USERS, payload: res.data });
    } catch (err) {
      dispatch({ type: SEARCH_USERS_FAIL, payload: err.response.msg });
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get('/getUsers/10');

      dispatch({ type: SEARCH_USERS, payload: res.data });
    } catch (err) {
      dispatch({ type: SEARCH_USERS_FAIL, payload: err.response.msg });
    }
  };

  const clearState = () => {
    dispatch({ type: CLEAR });
  };

  return (
    <HomeContext.Provider
      value={{
        posts: state.posts,
        allPosts: state.allPosts,
        profile: state.profile,
        followed: state.followed,
        suggested: state.suggested,
        foundUsers: state.foundUsers,
        error: state.error,
        getAllPosts,
        getFollowedPosts,
        getProfile,
        getSuggestedUsers,
        getFollowedUsers,
        followUser,
        findUser,
        getUsers,
        clearState,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeState;
