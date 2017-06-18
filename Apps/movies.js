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
  StatusBar, 
  RefreshControl, 
  TextInput
} from 'react-native';

var MovieDetailView = require('./MovieDetailView');

export default class Movie extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.id !== r2.id});
        this.state = {
            dataSource: ds.cloneWithRows([]), 
            searchText: ''
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
                        <Text style={styles.title}>{rowData.title}</Text>
                        <Text style={styles.description} numberOfLines={3}>{rowData.overview}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _onEndReached = () => {
        alert("Ahah, onEndReached fired !!!")
    }

    renderFooter(){
        return(
            <View>
                <Text>End...</Text>
            </View>
        )
    }

    _onRefresh() {
        this.getMoviesFromApiAsync();
    }

    renderHeader(){
        return(
        <View>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(searchText) => this.searchMovie(searchText)}
                value={this.state.searchText}
            />
        </View>
        )
    }

    searchMovie(text){
        this.setState({
            searchText : text,
        })

        var rows = [];
        for (var i=0; i < this.state.dataSource._dataBlob.s1.length; i++) {
            var title = this.state.dataSource._dataBlob.s1[i].title.toLowerCase();
            var desc = this.state.dataSource._dataBlob.s1[i].overview.toLowerCase();
            if(title.search(text.toLowerCase()) !== -1 || desc.search(text.toLowerCase()) !== -1){
                rows.push(this.state.dataSource._dataBlob.s1[i]);
            }
        }

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(rows)
        });

        if (text === '') {
            this.getMoviesFromApiAsync();
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="red"
                />
                <ListView
                    renderHeader={this.renderHeader.bind(this)}
                    enableEmptySectio = {true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovieCell.bind(this)}
                    renderFooter={this.renderFooter}
                    onEndReached={this._onEndReached}
                    RefreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefreah={() => this._onRefresh.bind(this)}
                        />
                    }
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
  title: {
    fontWeight: 'bold', 
    fontSize: 17,
    margin: 5,
  },
  description: {
    margin: 5,
    textAlign: 'left'
  }, 
})