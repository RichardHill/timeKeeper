'use strict';
import React, {
    Component
} from 'react';
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

export default class account extends Component {

    constructor(props) {
        super(props);

        this.fbDB = props.fbDB;

        this.state = {
            loaded: false,
            user: null
        }

    }

    componentWillMount() {

        this.setState({
            loaded: true,
            user: this.props.user
        });

        // AsyncStorage.getItem('user_data').then((user_data_json) => {
        //   let user_data = JSON.parse(user_data_json);
        //   this.setState({
        //     user_email: user_data.email,
        //     user_profile: user_data.photoURL === null ? 'http://genglobal.org/sites/default/files/pictures/default-user-image.png' : user_data.photoURL,
        //     loaded: true
        //   });
        // });

    }

    render() {

        return ( <View style = { styles.container } >
            <Header text = "Account"
            loaded = { this.state.loaded }
            />   <
            View style = {
                styles.body
            } > {
                this.state.user_email &&
                <
                View style = {
                    styles.body
                } >
                <
                View style = {
                    page_styles.email_container
                } >
                <
                Text style = {
                    page_styles.email_text
                } > {
                    this.state.user_email
                } < /Text> <
                /View> <
                Image
                style = {
                    styles.image
                }
                source = {
                    {
                        uri: this.state.user_profile
                    }
                }
                /> <
                Button
                text = "Logout"
                onpress = {
                    this.logout.bind(this)
                }
                button_styles = {
                    styles.primary_button
                }
                button_text_styles = {
                    styles.primary_button_text
                }
                /> <
                /View>
            } <
            /View> <
            /View>
        );
    }

    logout() {
      
          this.fbDB.auth().signOut().then(() => {
              this.props.navigator.push({
                  component: Login,
                  fbDB: this.fbDB
              });

          }).catch((error) => {
              alert('Failed to logout....');
          });
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