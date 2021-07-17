import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AppContext } from '../context';

const Store = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    avatar: null,
    following: [],
    followers: [],
    token: undefined,
    error: undefined,
    isAuth: false,
  });
  const [showModalDialog, setShowModalDialog] = useState(false);
  const [showProfile, setShowProfile] = useState(null);

  const [followed, setFollowed] = useState([]);
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    getUser();
    async function fetchData() {
      if (user.isAuth) {
        await axios
          .get('/getFollowing')
          .then((data) => {
            setFollowed(data.data);
          })
          .catch((err) => {
            console.error(err);
          });
        await axios
          .get('/getSuggestedUsers')
          .then((data) => {
            setSuggested(data.data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        await axios.get('/getUsers/5').then((data) => {
          setSuggested(data.data);
        });
      }
    }
    fetchData();
  }, [user.isAuth]);

  const getUser = async () => {
    if (localStorage.token) {
      axios.defaults.headers.common['x-auth-token'] = localStorage.token;
      await axios
        .get('/getProfile')
        .then((data) => {
          setUser({
            id: data.data.id,
            name: data.data.name,
            username: data.data.username,
            email: data.data.email,
            avatar: data.data.avatar,
            following: data.data.following,
            followers: data.data.followers,
            token: localStorage.token,
            error: undefined,
            isAuth: true,
          });
        })
        .catch((err) => {
          setUser({
            id: '',
            name: '',
            username: '',
            email: '',
            avatar: null,
            following: [],
            followers: [],
            token: undefined,
            error: err.response.data.msg,
            isAuth: false,
          });
        });
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  const login = async (loginData) => {
    await axios
      .post('/login', loginData)
      .then((data) => {
        if (data.data.token) {
          localStorage.setItem('token', data.data.token);
          setUser({
            email: loginData.email,
            token: data.data.token,
            error: data.data.err,
            isAuth: true,
          });
          setShowModalDialog(false);
          return false;
        }
      })
      .catch((err) => {
        return true;
      });
  };

  const resetState = () => {
    setUser({
      id: '',
      name: '',
      username: '',
      email: '',
      avatar: null,
      following: [],
      followers: [],
      token: undefined,
      error: undefined,
      isAuth: false,
    });
  };

  const likePost = async (postId) => {
    if (user.isAuth) {
      const likesCount = await axios.put('/likePost', { id: postId });
      return likesCount.data;
    } else {
      setShowModalDialog(true);
    }
  };

  const followUser = async (username) => {
    if (user.isAuth) {
      await axios.put(`/follow/${username}`).catch((err) => {
        console.error(err);
      });
      await axios
        .get('/getFollowing')
        .then((data) => {
          setFollowed(data.data);
        })
        .catch((err) => {
          console.error(err);
        });
      await axios
        .get('/getSuggestedUsers')
        .then((data) => {
          setSuggested(data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setShowModalDialog(true);
    }
  };

  const fetchFollowing = async () => {
    if (user.isAuth) {
      await axios
        .get('/getFollowing')
        .then((data) => {
          setFollowed(data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const fetchNotFollowing = async () => {
    if (user.isAuth) {
      await axios
        .get('/getSuggestedUsers')
        .then((data) => {
          setSuggested(data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      await axios.get('/getUsers/5').then((data) => {
        setSuggested(data.data);
      });
    }
  };

  const state = {
    user,
    setUser,
    getUser,
    showModalDialog,
    setShowModalDialog,
    showProfile,
    setShowProfile,
    login,
    resetState,
    followUser,
    followed,
    setFollowed,
    suggested,
    setSuggested,
    fetchFollowing,
    fetchNotFollowing,
    likePost,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default Store;
