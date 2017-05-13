'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Signup from './signup';
import Account from './account';
import Landing from './landing';
import Projects from './projects';

import styles from '../styles/common-styles.js';

export default class login extends Component {

  constructor(props){
    super(props);

    this.fbDB = props.fbDB;
  
    // this.state = {
    //   email: ' ',
    //   password: ' ',
    //   loaded: false
    // }
  
    this.state = {
      email: 'richardhill@hotmail.com',
      password: 'indurain',
      loaded: false
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Header text="Login" loaded={this.state.loaded} />
        <View style={styles.body}>   
        
          <Text>Email</Text>
          <TextInput
            style={{height: 40,borderWidth: 1, margin: 10, paddingLeft: 5}}
            autoCapitalize = 'none'
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email"}
          />
          
          <Text>Password</Text>
          <TextInput
            style={{height: 40,borderWidth: 1, margin: 10, paddingLeft: 5}}
            autoCapitalize = 'none'
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            placeholder={"Password"}
          />  
             
          <Button
            text="Login"
            onpress={this.login.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />
        
          <Button
            text="New here?"
            onpress={this.goToSignup.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }

  login(){

    var that = this;
    
    this.setState({ loaded: false });
    console.log("Username and password are -:" + this.state.email + ' ' + this.state.password);

    this.fbDB.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(user){
    
    console.log("User " + user.email + " logged in");
    
    that.setState({ loaded: true });
    
    AsyncStorage.setItem('user_data', JSON.stringify(user));
      that.props.navigator.push({
        component: Projects,
        fbDB: that.fbDB
      });
     }).catch(function(error) {
      if(error){
        alert('Login Failed. Please try again' + error);
      } 
    });
  }
    
    goToSignup(){
    this.props.navigator.push({
      component: Signup,
      fbDB: this.fbDB
    });
  }

}

AppRegistry.registerComponent('login', () => login);

// <TextInput
//   style={styles.textinput}
//   onChangeText={(text) => this.setState({email: text})}
//   value={this.state.email}
//   placeholder={"Email Address"}
// />
// <TextInput
//   style={styles.textinput}
//   onChangeText={(text) => this.setState({password: text})}
//   value={this.state.password}
//   secureTextEntry={true}
//   placeholder={"Password"}
// />
