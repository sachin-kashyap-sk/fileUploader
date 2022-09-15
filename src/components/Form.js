/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import PropTypes from 'prop-types';
class Form extends PureComponent {
  static propTypes = {
    message: PropTypes.string,
    progress: PropTypes.number,
    submitting: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  };
  static defaultProps = {
    message: '',
    progress: 0,
    submitting: false,
    onSubmit: () => {},
    onCancel: () => {},
  };
  handleCancel = e => {
    e.preventDefault();
    this.props.onCancel();
  };
  handleFormSubmit = () => {
    const file = this.fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);
    this.props.onSubmit(formData);
  };
  validateForm = values => {
    const errors = {};
    if (!values.file) {
      errors.file = 'No file selected.';
    }
    return errors;
  };

  render() {
    const {message, progress, submitting} = this.props;
    return (
      <View style={{padding: 10}}>
        <TouchableOpacity onPress={this.props.handleSubmit}>
          <Text
            ref={fileInput => (this.fileInput = fileInput)}
            // onSubmit={this.props.handleSubmit}
            style={{
              fontSize: 20,
              fontWeight: '700',
              borderWidth: 2,
              padding: 10,
            }}>
            Upload File
          </Text>
        </TouchableOpacity>
        <View style={{paddingTop: 10}}>
          <Button
            title="Upload"
            id="send"
            type="submit"
            disabled={submitting}
          />
        </View>
        {/* {submitting && ( */}
        <View style={{paddingTop: 10}}>
          <Button onPress={this.handleCancel} title="Reset">
            Reset
          </Button>
        </View>
        {/* )} */}

        {/* <View>
        {(submitting || message) && <hr />}
        {submitting && (
          <View className="ts tiny primary progress">
            <View className="bar" style={{width: `${progress * 100}%`}} />
          </View>
        )}
        {message}
      </View> */}
      </View>
    );
  }
}

export default Form;
