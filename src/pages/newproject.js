'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

import styles from '../styles/common-styles.js';

export default class newproject extends Component {

  constructor(props){
    super(props);
    
    this.fbDB = props.fbDB;
    
    this.state = {
      loaded: false,
    }

  }
  
  gotoLanding() {
      this.props.navigator.pop();
  }

  componentWillMount(){

    // AsyncStorage.getItem('user_data').then((user_data_json) => {
    //   let user_data = JSON.parse(user_data_json);
    //   this.setState({
    //     user_email: user_data.email,
    //     user_profile: user_data.photoURL === null ? 'http://genglobal.org/sites/default/files/pictures/default-user-image.png' : user_data.photoURL,
    //     loaded: true
    //   });
    // });
  }

  render(){

    return (
      <View style={styles.container}>
        <Header text="New Project" loaded={this.state.loaded} />  
        <View style={styles.body}>
            <View style={styles.body}>
              <Text>Project Name</Text>
            </View>
            
            <Button
              text="Return.."
              onpress={this.gotoLanding.bind(this)}
              button_styles={page_styles.btn_return_text}
              button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
}

const page_styles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});
