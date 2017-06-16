'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  ListView, 
  Image, 
  TouchableHighlight
} from 'react-native';

class MovieDetailView extends Component {
  render() {
    var movie = this.props.movie;

    return (
        <View style={styles.container}>
            <Image style={styles.image}
                   source={{uri: 'https://image.tmdb.org/t/p/w342' + movie.poster_path}}
            />
            <View>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.description}>{movie.overview}</Text>
            </View>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    backgroundColor: "orange",
    flex: 1
  },
  image: {
    width: 400,
    height: 300
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold', 
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});

module.exports = MovieDetailView;