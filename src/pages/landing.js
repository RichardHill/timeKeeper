'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Text,
  TextInput,
  View
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import LogTime from './logtime';
import ViewTime from './viewtime';
import Account from './account';
import Login from './login';

import styles from '../styles/common-styles.js';

export default class landing extends Component {

  constructor(props){
    super(props);
    
    console.log(props);
    
    this.fbDB = props.fbDB;
    
    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }
  
  landing(){

      console.log("entered landing....");
      
      this.setState({
        email: '',
        password: '',
        loaded: true
      });
  }

  gotoLogTime(){
    this.props.navigator.push({
      component: LogTime,
      fbDB: this.fbDB
    });
  }
  
  gotoViewTime() {
    this.props.navigator.push({
      component: ViewTime,
      fbDB: this.fbDB
    });
  }
  
  gotoAccount() {
    this.props.naviagtor.push({
      component: Account,
      fbDB: this.fbDB
    });
  }
  
  logout(){

    AsyncStorage.removeItem('user_data').then(() => {    
  
      this.fbDB.auth().signOut().then(() => {
      
        this.props.navigator.push({
          component: Login,
          fbDB : this.fbDB
        });
        
      }).catch((error) => {
            alert('Failed to logout....');
      });
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Home" loaded={this.state.loaded} />
        <View style={styles.body}>

          <Button
            text="Add Time"
            onpress={this.gotoLogTime.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="Time Summary"
            onpress={this.gotoViewTime.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />
            
            <Button
              text="Log Out"
              onpress={this.logout.bind(this)}
              button_styles={styles.primary_button}
              button_text_styles={styles.primary_button_text} />            
            
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('landing', () => landing);
