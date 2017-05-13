'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  ListView
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';
import Landing from './landing';
import LogTime from './logtime';

import styles from '../styles/common-styles.js';

export default class viewtime extends Component {

  constructor(props){
    super(props);
    
    console.log(props);
    
    this.fbDB = props.fbDB;
    
    this.state = {
      loaded: true,
      email: '',
      password: '',
      listViewSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 }),
      dataSource: null
    };
  }
  
  componentWillMount() {
    
    //Go and get our data.
    const data = [];
    var that = this;
    this.fbDB.database().ref('/employers/soverign/employees/' + 'helenhill').once('value').then(function(snapshot) {
            
      // Object.keys(listOfTimeEnteries).forEach(function(key) {
      //     data.push(listOfTimeEnteries[key]);          
      // });
  
      that.setState({dataSource : that.state.listViewSource.cloneWithRows(snapshot.val())});
              
    });
    
}
  
  viewtime(){

      console.log('View Time....');
      
      this.setState({
        email: '',
        password: '',
        loaded: true
      });
    
  }
  
  gotoLanding() {
    this.props.navigator.push({
      component: Landing,
      fbDB: this.fbDB
    });
  }

  render() {
    
    this.state.dataSource;
    
      if (this.state.dataSource === null) {
          return <Text>Loading ...</Text>;
      } else {
        return (<View style={styles.container}>
        <Header text="Time - Summary" loaded={this.state.loaded} />
        <View style={styles.body}>
        
        <ListView style={{borderWidth: 1}}
             dataSource={this.state.dataSource}
             renderRow={(rowData) => <Text style={styles.listview_rowitem}>{`${rowData.date} - ${rowData.task_description.substring(0,30)} - ${rowData.duration_hours}hrs:${rowData.duration_minutes}mins`}</Text>}
           />
            
        <Button
          text="Return.."
          onpress={this.props.navigator.pop()}
          button_styles={styles.transparent_button}
          button_text_styles={styles.transparent_button_text} />
          
        </View>
      </View>
    );
  }
  }
}

AppRegistry.registerComponent('viewtime', () => viewtime);
