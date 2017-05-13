'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

import styles from '../styles/common-styles.js';

export default class signup extends Component {

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
  
  signup(){

    this.setState({
      loaded: false
    });

    this.fbDB.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(function(success) {
    
      alert('Your account was created!');
    
    }).catch(function(error) {

      if(error){
        switch(error.code){

          case "auth/email-already-in-use":
            alert("The new user account cannot be created because the email is already in use.");
          break;

          case "auth/invalid-email":
            alert("The specified email is not a valid email.");
          break;

          default:
            alert("Error creating user:");
        }
      }   
    });

      this.setState({
        email: '',
        password: '',
        loaded: true
      });
  }

  goToLogin(){
    this.props.navigator.push({
      component: Login,
      fbDB: this.fbDB
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
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
            text="Signup"
            onpress={this.signup.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="Got an Account?"
            onpress={this.goToLogin.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);

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
