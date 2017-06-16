import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  ListView, 
  Image
} from 'react-native';

export default class Movie extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }

    render() {
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovieCell}
                />
            </View>
        )
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

    renderMovieCell(rowData){
        return(
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
        )
    }
}

var styles = StyleSheet.create({
    
})