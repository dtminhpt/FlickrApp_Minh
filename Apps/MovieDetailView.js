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
  TouchableOpacity
} from 'react-native';

class MovieDetailView extends Component {
  clickToOpen(){
      alert("Xin chao!!!");
  }
  render() {
    var movie = this.props.movie;

    return (
        <View style={styles.container}>
            <Image style={styles.backgroundImage}
                   source={{uri: 'https://image.tmdb.org/t/p/w342' + movie.poster_path}}>
                   <TouchableOpacity onPress={() => this.clickToOpen()}>
                       <View>
                                <Text style={styles.title}>{movie.title}</Text>
                                <Text style={styles.description}>{movie.overview}</Text>
                        </View>
                   </TouchableOpacity>
            </Image>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    backgroundColor: 'transparent',
    flex: 1, 
    alignItems: 'center'
  },
  image: {
    width: 400,
    height: 500
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
});

module.exports = MovieDetailView;