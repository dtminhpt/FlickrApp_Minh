/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  TabBarIOS
} from 'react-native';

import AppNavigator from "./Apps/TabBarIOS1.js";

export default class FlickrApp extends Component {
   constructor() {
    super();  
    this.state = {
      selectedTab: 'homeTab',
    };
  }

  render() {
    return (
      <AppNavigator/>
    );
  }
}

AppRegistry.registerComponent('FlickrApp', () => FlickrApp);
