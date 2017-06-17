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
  NavigatorIOS
} from 'react-native';

import Movies from "./Apps/movies.js";

export default class FlickrApp extends Component {
  render() {
    return (
      <NavigatorIOS
          initialRoute={{
            title: 'Flickr',
            component: Movies, 
            barTintColor: 'orange'
          }}
          style={{flex: 1}}
        /> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FlickrApp', () => FlickrApp);
