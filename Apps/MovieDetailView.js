'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  ListView, 
  Image, 
  TouchableHighlight, 
  TouchableOpacity, 
  ScrollView,
  LayoutAnimation
} from 'react-native';

class MovieDetailView extends Component {
    constructor() {
        super();
        this.state = {
        height: 200,
        line : 4,
        marginScroll: 500
        }
    }
    clickToOpen(){
        var height = this.state.height;
        var line = this.state.line;
        var marginScroll = this.state.marginScroll;
        if(height == 200){
        height = 50;
        line = 0
        marginScroll = 100
        }else{
        height = 200;
        line = 4
        marginScroll = 500
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
        height,
        line,
        marginScroll
        })
    }

  _clickToOpen(){
      alert("Xin chao!!!");
  }
  render() {
    var movie = this.props.movie;
    var height = this.state.height;
    var line = this.state.line; // 0: will be showed all lines
    var marginScroll = this.state.marginScroll;

    return (
        <View style={styles.container}>
            <Image style={styles.backgroundImage}
                   source={{uri: 'https://image.tmdb.org/t/p/w342' + movie.poster_path}}>
                   <View style={[styles.containerText]}>
                        <ScrollView
                        style={{}}>
                            <Text numberOfLines={1}  style={styles.title}>{movie.title}</Text>
                            <TouchableOpacity onPress={() => this.clickToOpen()}>
                                <View style={styles.page}>
                                    <Text numberOfLines={line} 
                                          style={styles.description}>{movie.overview}</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
            </Image>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  containerText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'column-reverse',
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold', 
    margin: 5,
    color: 'white', 
    textAlign: 'center'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: 'white', 
    textAlign: 'center'
  }, 
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }, 
  page: {
    alignItems: 'flex-end',
    flexDirection: 'column-reverse', 
    width: 200
  }
});

module.exports = MovieDetailView;