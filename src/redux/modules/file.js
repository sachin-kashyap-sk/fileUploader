/* eslint-disable prettier/prettier */

import {createAction, handleActions} from 'redux-actions';
import {UPLOAD_SUCCESS} from '../../constants/Upload';

export const UPLOAD_FILE = 'file/upload';
export const UPLOAD_FILE_LOADING = 'file/upload_loading';
export const UPLOAD_FILE_SUCCESS = 'file/upload_success';
export const UPLOAD_FILE_FAILED = 'file/upload_failed';
export const CANCEL_UPLOAD = 'file/cancel_upload';
export const SET_UPLOAD_PROGRESS = 'file/set_upload_progress';

export const uploadFile = createAction(UPLOAD_FILE);
export const uploadFileLoading = createAction(UPLOAD_FILE_LOADING);
export const uploadFileSuccess = createAction(UPLOAD_FILE_SUCCESS);
export const uploadFileFailed = createAction(UPLOAD_FILE_FAILED);
export const cancelUpload = createAction(CANCEL_UPLOAD);
export const setUploadProgress = createAction(SET_UPLOAD_PROGRESS, v => v);

const initState = {
  formState: 'idle',
  progress: 0,
  message: '',
};

const reducer = handleActions(
  {
    [UPLOAD_FILE]: state => ({
      ...state,
      formState: 'loading',
      message: '',
    }),
    [UPLOAD_FILE_LOADING]: state => ({
      ...state,
      formState: 'loading',
      message: '',
    }),
    [UPLOAD_FILE_SUCCESS]: state => ({
      ...state,
      formState: 'idle',
      message: UPLOAD_SUCCESS,
    }),
    [UPLOAD_FILE_FAILED]: (state, action) => ({
      ...state,
      formState: 'idle',
      message: action.payload,
    }),
    [CANCEL_UPLOAD]: (state, action) => ({
      ...state,
      formState: 'idle',
      message: '',
    }),
    [SET_UPLOAD_PROGRESS]: (state, action) => ({
      ...state,
      progress: action.payload,
    }),
  },
  initState,
);

export default reducer;
