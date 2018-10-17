/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, View, ViewPropTypes ,TouchableOpacity} from 'react-native';
import FileViewer from 'react-native-file-viewer';

export default class MessageImage extends Component {
  constructor(props){
    super(props)
    this.state ={imagePath: null}
   }
  
  componentWillMount() {
    mediaExtansions = ["gif","ico","jpeg","png","jpg"]
    mediaExtansions.find((extension) => {
      if(this.props.currentMessage.image.split('.').pop() == extension) {
        this.state.imagePath = "file://" + this.props.currentMessage.image;
        return;
      }
    })
    if(this.state.imagePath == null) {
      this.state.imagePath = "https://cdn3.iconfinder.com/data/icons/brands-applications/512/File-512.png"
    }
  }

  openFile = () => {
      FileViewer.open(this.props.currentMessage.image, { showOpenWithDialog: true })
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  }

  render() {
    return (
    <View style={[styles.container, this.props.containerStyle]}>
      <TouchableOpacity
         onPress={this.openFile}
       >
        <Image
          {...this.props.imageProps}
          style={[styles.image, this.props.imageStyle]}
          source={{ uri: this.state.imagePath }}
        />
        </TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
});

MessageImage.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  lightboxProps: {},
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};