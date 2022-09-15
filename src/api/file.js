/* eslint-disable prettier/prettier */

import {eventChannel, END} from 'redux-saga';
import {IMGUR_CLIENT_ID, UPLOAD_CANCELED} from '../constants/Upload';

export const upload = (formData, onProgress) => {
  return eventChannel(emitter => {
    const xhr = new XMLHttpRequest();
    const onProgress = e => {
      if (e.lengthComputable) {
        const progress = e.loaded / e.total;
        emitter({progress});
      }
    };
    const onFailure = err => {
      emitter({err: err.data.error});
      emitter(END);
    };
    const onCanceled = e => {
      emitter({err: UPLOAD_CANCELED});
      emitter(END);
    };
    xhr.upload.addEventListener('progress', onProgress);
    xhr.upload.addEventListener('error', onFailure);
    xhr.upload.addEventListener('abort', onCanceled);
    xhr.onreadystatechange = e => {
      const {readyState, status} = xhr;
      if (readyState === 4) {
        if (status === 200) {
          emitter({success: true});
          emitter(END);
        } else {
          onFailure(JSON.parse(xhr.response));
        }
      }
    };
    xhr.open('POST', 'https://api.imgur.com/3/upload', true);
    xhr.setRequestHeader('Authorization', `Client-ID ${IMGUR_CLIENT_ID}`);
    xhr.send(formData);
    return () => {
      xhr.upload.removeEventListener('progress', onProgress);
      xhr.upload.removeEventListener('error', onFailure);
      xhr.upload.removeEventListener('abort', onFailure);
      xhr.onreadystatechange = null;
      xhr.abort();
    };
  });
};
