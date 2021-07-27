import {
  MODAL_DIALOG,
  POST_DIALOG_SUCCESS,
  POST_FAIL,
  CLOSE_DIALOG,
} from '../types';

const dialogReducer = (state, action) => {
  switch (action.type) {
    case MODAL_DIALOG:
      return {
        ...state,
        modalDialog: true,
        registerPage: action.payload,
        postDialog: null,
        error: null,
      };
    case POST_DIALOG_SUCCESS:
      return {
        ...state,
        modalDialog: false,
        postDialog: action.payload,
        error: null,
      };
    case POST_FAIL:
    case CLOSE_DIALOG:
      return {
        ...state,
        modalDialog: false,
        postDialog: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dialogReducer;
