'use strict';
import React, { Component, PropTypes  } from 'react';
import { View, StyleSheet } from 'react-native';

import Spinner from 'react-native-spinkit';

// valid spinner types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt']

class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, size, color, isVisible } = this.props;
    return (
      <View style={styles.loader}>
        <Spinner
          isVisible={isVisible}
          type={type}
          size={size}
          color={color}
        />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: 'rgba(239, 239, 239, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

Loader.defaultProps = {
  isVisible: true,
  type: 'Bounce',
  size: 50,
  color: '#F5A623',
}

export default Loader;
