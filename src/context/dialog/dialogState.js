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
    postDialog: null,
    error: null,
  };

  const [state, dispatch] = useReducer(dialogReducer, initialState);

  const showModalDialog = () => {
    dispatch({ type: MODAL_DIALOG });
  };

  const showPostDialog = async (postId) => {
    try {
      const res = await axios.get('/getPost/:id');
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
