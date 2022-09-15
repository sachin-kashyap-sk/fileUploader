/* eslint-disable prettier/prettier */

import {all} from 'redux-saga/effects';

import {watchUploadFile} from './file';

export default function* rootSaga() {
  yield all([watchUploadFile()]);
}
