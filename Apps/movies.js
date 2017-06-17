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
} from 'react-native';

var MovieDetailView = require('./MovieDetailView');

export default class Movie extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.id !== r2.id});
        this.state = {
            dataSource: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        this.getMoviesFromApiAsync();
    }

    getMoviesFromApiAsync() {
        return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseJson.results)
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    _rowPressed(movie){
        this.props.navigator.push({
            title: movie.title,
            component: MovieDetailView,
            passProps: {movie: movie},
            barTintColor: 'orange'
        })
    }

    renderMovieCell(rowData){
        if (!rowData) return;

        return(
            <TouchableHighlight
                    onPress={() => this._rowPressed(rowData)}
                    underlayColor='#dddddd'>
                <View style={{ flexDirection: 'row', backgroundColor: 'orange'}}>
                    <View style={{margin: 10, flex: 3}}>
                    <Image source={{uri: 'https://image.tmdb.org/t/p/w342' + rowData.poster_path}}
                            style={{height: 150}} />
                    </View>
                    <View style={{flex: 7}}>
                        <Text>{rowData.title}</Text>
                        <Text numberOfLines={3}>{rowData.overview}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _onEndReached = () => {
        alert("Ahah, onEndReached fired !!!")
    }

    render() {
        return(
            <View style={styles.container}>
                <ListView
                    enableEmptySectio = {true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovieCell.bind(this)}
                    renderFooter={this.renderFooter}
                    onEndReached={this._onEndReached}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    
})