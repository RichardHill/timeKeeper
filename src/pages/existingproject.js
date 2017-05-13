'use strict';
import React, { Component } from 'react';

import {
    AppRegistry,
    AsyncStorage,
    Text,
    TextInput,
    View,
    ListView
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import LogTime from './logtime';
import ViewTime from './viewtime';
import Account from './account';
import Login from './login';

import styles from '../styles/common-styles.js';

export default class existingprojects extends Component {

    constructor(props) {
        super(props);

        console.log(props);

        this.fbDB = props.fbDB;

        this.state = {
          loaded: true
        };

    }

    existingprojects() {

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

    goBack() {
        this.props.navigator.pop();
    }
    render() {
      return (
        <View style={styles.container}>
          <Header text=" Choose project..." loaded={this.state.loaded} />
          <View style={styles.body}>
                        
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
