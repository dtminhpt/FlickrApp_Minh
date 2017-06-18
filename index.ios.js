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

import StarterTabBarIOS from "./Apps/TabBarIOS1.js";

export default class FlickrApp extends Component {
   constructor() {
    super();  
    this.state = {
      selectedTab: 'homeTab',
    };
  }

  render() {
    return (
      <StarterTabBarIOS/>
    );
  }
}

AppRegistry.registerComponent('FlickrApp', () => FlickrApp);
