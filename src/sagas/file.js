/* eslint-disable prettier/prettier */

import {put, call, take, race, cancelled} from 'redux-saga/effects';

import {
  UPLOAD_FILE,
  uploadFileLoading,
  uploadFileSuccess,
  uploadFileFailed,
  setUploadProgress,
  CANCEL_UPLOAD,
} from '../redux/modules/file';
import {upload as uploadAPI} from '../api/file';
import {UPLOAD_CANCELED} from '../constants/Upload';

function* uploadFile(action) {
  try {
    yield put(uploadFileLoading());
    const channel = yield call(uploadAPI, action.payload);
    while (true) {
      const {progress = 0, err, success} = yield take(channel);
      if (!(yield cancelled())) {
        if (err) {
          yield put(uploadFileFailed(err));
          yield put(setUploadProgress(0));
          return;
        }
        if (success) {
          yield put(uploadFileSuccess());
          yield put(setUploadProgress(0));
          return;
        }
        yield put(setUploadProgress(progress));
      }
    }
  } catch (err) {
    yield put(uploadFileFailed(err));
    yield put(setUploadProgress(0));
  } finally {
    if (yield cancelled()) {
      yield put(uploadFileFailed(UPLOAD_CANCELED));
      yield put(setUploadProgress(0));
    }
  }
}

function* watchUploadFile() {
  try {
    while (true) {
      const action = yield take(UPLOAD_FILE);
      yield race([call(uploadFile, action), take(CANCEL_UPLOAD)]);
    }
  } finally {
    console.log('watchUploadFile terminated');
  }
}

export {uploadFile, watchUploadFile};
