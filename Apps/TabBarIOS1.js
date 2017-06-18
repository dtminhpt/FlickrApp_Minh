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
    this.state = {selectedTab: 'tabFavorites'};
  }

  setTab(tabId) {
    this.setState({selectedTab: tabId});
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="recents"
          selected={this.state.selectedTab === 'tabDownloads'}
          onPress={() => this.setTab('tabDownloads')}>
          
          <NavigatorIOS
            initialRoute={{
              title: 'Flickr',
              component: Movies, 
              barTintColor: 'orange'
            }}
            style={{flex: 1}}
          /> 
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="top-rated"
          selected={this.state.selectedTab === 'tabFavorites'}
          onPress={() => this.setTab('tabFavorites')}>

          <NavigatorIOS
            initialRoute={{
              title: 'Flickr',
              component: Movies, 
              barTintColor: 'orange'
            }}
            style={{flex: 1}}
          /> 

        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    margin: 50,
    fontSize: 40
  }
});

AppRegistry.registerComponent('StarterTabBarIOS', () => StarterTabBarIOS);