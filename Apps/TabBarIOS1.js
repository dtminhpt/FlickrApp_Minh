/**
 * React Native Starter: TabBarIOS
 * https://github.com/joshbuchea/react-native-starter-tabbarios
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  Image,
  NavigatorIOS
} from 'react-native';

import { StackNavigator, DrawerConfig, TabNavigator } from 'react-navigation';
import Movies from "./movies.js";
import TopRatedMovies from "./TopRatedMovies.js";

/**
 * Now Playing Tab
 */
class TabNowPlaying extends React.Component {
  static navigationOptions = {
    title: "Now Playing",
    tabBarIcon: () => (
      <Image
        style={[styles.tabBarIcon]}
        source={require('./TabBarIcon/play-icon.png')}
      />
    )
  }
  
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

/**
 * Top Rated Tab
 */
class TabTopRated extends React.Component {
  static navigationOptions = {
    title: "Top Rated",
    tabBarIcon: () => (
      <Image
        style={[styles.tabBarIcon]}
        source={require('./TabBarIcon/top-rated.png')}
      />
    )
  }
  render() {
    return (
      <TopRatedMovies />
    );
  }
}

const tabConfig = {
  tabBarOptions: {
    activeTintColor: "black",
    activeBackgroundColor: "orange",
  }
}

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 29,
    height: 29,
  }
})
const AppNavigator = TabNavigator({
  Playing: { screen: TabNowPlaying },
  TopRated: { screen: TabTopRated }
}, tabConfig)

export default AppNavigator

AppRegistry.registerComponent('AppNavigator', () => AppNavigator);