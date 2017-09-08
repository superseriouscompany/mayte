/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Root from './app/containers/Root'
import {
  AppRegistry,
} from 'react-native';

export default class mayte extends Component {
  render() {
    return (
      <Root />
    );
  }
}

AppRegistry.registerComponent('mayte', () => mayte);
