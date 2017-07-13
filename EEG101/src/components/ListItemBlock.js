// ListItemBlock.js
// Child component for  ListView component.

import React, { Component } from 'react';
import { MediaQueryStyleSheet} from 'react-native-responsive';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class ListItemBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {this.props.title}
          </Text>
        </View>
        <View>
          <Text style={styles.bodyText}>
            {this.props.children}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = MediaQueryStyleSheet.create(
  // Base styles
  {
    container: {
      borderRadius: 3,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      backgroundColor: '#ffffff',
      margin: 10,
      marginVertical: 5,
      overflow: 'hidden',
      elevation: 2,
    },
    titleContainer: {
      borderBottomWidth: 0.5,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 2.5,
      backgroundColor: '#cce9f8',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    titleText: {
      fontFamily: 'Roboto-Bold',
      color: '#484848',
      fontSize: 20,
      margin: 5,
    },

    bodyText: {
      fontFamily: 'Roboto-Light',
      color: '#484848',
      fontSize: 15,
      margin: 5,
    },
  },
  // Responsive styles
  {
    titleText: {
      fontSize: 25,
    },

    bodyText: {
      fontSize: 20,
    }
  });

module.exports = ListItemBlock;
