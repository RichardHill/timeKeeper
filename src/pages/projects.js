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
import NewProject from './newproject';
import ExistingProject from './existingproject';

import styles from '../styles/common-styles.js';

export default class Projects extends Component {

    constructor(props) {
        super(props);

        console.log(props);

        this.fbDB = props.fbDB;

        this.state = {
          loaded: true
        };

    }

    projects() {

        console.log("entered projects....");

        this.setState({
            email: '',
            password: '',
            loaded: true
        });
    }

    gotoNewProject() {
        this.props.navigator.push({
            component: NewProject,
            fbDB: this.fbDB
        });
    }

    gotoExistingProject() {
        this.props.navigator.push({
            component: ExistingProject,
            fbDB: this.fbDB
        });
    }
    
    goBack(){ 
      this.props.navigator.pop();
    }
    
    render() {
      return (
        <View style={styles.container}>
          <Header text="Projects" loaded={this.state.loaded} />
          <View style={styles.body}>
          
            <Button
              text="New Project ?"
              onpress={this.gotoNewProject.bind(this)}
              button_styles={styles.primary_button}
              button_text_styles={styles.primary_button_text} />
          
            <Button
              text="Existing Project"
              onpress={this.gotoExistingProject.bind(this)}
              button_styles={styles.primary_button}
              button_text_styles={styles.primary_button_text} />
            
            <Button
              text="Return.."
              onpress={this.goBack.bind(this)}
              button_styles={styles.transparent_button}
              button_text_styles={styles.transparent_button_text} />
                            
          </View>            
        </View>
      );
    }




}

AppRegistry.registerComponent('projects', () => projects);
