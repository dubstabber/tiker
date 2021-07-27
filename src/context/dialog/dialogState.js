import React, { useReducer } from 'react';
import axios from 'axios';
import DialogContext from './dialogContext';
import dialogReducer from './dialogReducer';
import {
  MODAL_DIALOG,
  POST_DIALOG_SUCCESS,
  POST_FAIL,
  CLOSE_DIALOG,
} from '../types';

const DialogState = ({ children }) => {
  const initialState = {
    modalDialog: false,
    registerPage: false,
    postDialog: null,
    error: null,
  };

  const [state, dispatch] = useReducer(dialogReducer, initialState);

  const showModalDialog = (page) => {
    dispatch({ type: MODAL_DIALOG, payload: page });
  };

  const showPostDialog = async (postId) => {
    try {
      const res = await axios.get('/getPost/' + postId);
      document.querySelector('body').classList.add('hide-scroll');
      dispatch({ type: POST_DIALOG_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: POST_FAIL, payload: err.response.data.msg });
    }
  };

  const closeDialog = () => {
    dispatch({ type: CLOSE_DIALOG });
  };

  return (
    <DialogContext.Provider
      value={{
        modalDialog: state.modalDialog,
        postDialog: state.postDialog,
        registerPage: state.registerPage,
        showModalDialog,
        showPostDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export default DialogState;
