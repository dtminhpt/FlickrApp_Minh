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
let _movieList = [];
export default class TopRatedMovies extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.id !== r2.id});
        this.state = {
            dataSource: ds.cloneWithRows([]), 
            searchText: '', 
            refreshing: false, 
            isFirstPage: true, 
            currentPage: 1
        };
    }

    componentWillMount() {
        this.getMoviesFromApiAsync();
    }

    getMoviesFromApiAsync() {
        if (this.state.isFirstPage) {
            _movieList = [];
        }

        return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
        .then((response) => response.json())
        .then((responseJson) => {
            _movieList = _movieList.concat(responseJson.results)
            console.log(responseJson);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(_movieList),
                isFirstPage: false,
                currentPage: this.state.currentPage + 1
            })
        })
        .catch((error) => {
            //console.error(error);
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
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
        this.getMoviesFromApiAsync()
    }

    renderFooter(){
        return(
            <View>
                <Text>End...</Text>
            </View>
        )
    }

    _onRefresh() {
        this.setState({
            refreshing: true, 
            isFirstPage: true
        })
        this.getMoviesFromApiAsync().then(() => {
            this.setState({ refreshing: false });
        });
    }

    renderHeader(){
        return(
        <View>
            <TextInput
                style={styles.inputSearch}
                onChangeText={(searchText) => this.searchMovie(searchText)}
                value={this.state.searchText}
                placeholder="Search..."
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

        if (rows.length === 0) {
            alert('No results');
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(['No results'])
            });
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
                    enableEmptySections = {true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovieCell.bind(this)}
                    renderFooter={this.renderFooter}
                    onEndReached={this._onEndReached}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
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
  inputSearch:{
      height: 30, 
      flex: 1, 
      paddingHorizontal: 8, 
      fontSize: 15, 
      backgroundColor: '#FFFFFF', 
      borderRadius: 2
  }
})