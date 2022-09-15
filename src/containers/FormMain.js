/* eslint-disable prettier/prettier */

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {uploadFile, cancelUpload} from '../redux/modules/file';
import Form from '../components/Form';
import {View, Text} from 'react-native';

class FormMain extends PureComponent {
  render() {
    const {uploadFile, file, cancelUpload} = this.props;
    return (
      <View>
        <View>
          <Text>Upload File</Text>
        </View>
        <View className="description">
          <Form
            // submitting={file.formState === 'loading'}
            // progress={file.progress}
            // message={file.message}

            onPress={uploadFile}
            onCancel={cancelUpload}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    file: state.file,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      uploadFile,
      cancelUpload,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FormMain);
