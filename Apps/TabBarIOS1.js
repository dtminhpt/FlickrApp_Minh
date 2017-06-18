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
  TabBarIOS, NavigatorIOS
} from 'react-native';

import Movies from "./movies.js";

export default class StarterTabBarIOS extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedTab: 'tabNowPlaying'};
  }

  setTab(tabId) {
    this.setState({selectedTab: tabId});
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="recents"
          selected={this.state.selectedTab === 'tabNowPlaying'}
          onPress={() => this.setTab('tabNowPlaying')}>
          
          <TabNowPlaying/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="top-rated"
          selected={this.state.selectedTab === 'tabTopRated'}
          onPress={() => this.setTab('tabTopRated')}>

          <TabTopRated/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

/**
 * Now Playing Tab
 */
class TabNowPlaying extends React.Component {
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

var styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('StarterTabBarIOS', () => StarterTabBarIOS);