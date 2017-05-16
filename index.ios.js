'use strict';
import React, {
    Component
} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Navigator,
    AsyncStorage
} from 'react-native';

import Signup from './src/pages/signup';
import Account from './src/pages/account';

import Header from './src/components/header';

import Firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: "AIzaSyCcKGHc2riqP5S7jarLPQ4gaDkyD_49YsE",
//   authDomain: "timekeeper-d6272.firebaseapp.com",
//   databaseURL: "https://timekeeper-d6272.firebaseio.com",
//   storageBucket: "timekeeper-d6272.appspot.com",
//   messagingSenderId: "251914286448",  
// };

//const fbApp = Firebase.initializeApp(firebaseConfig);

import styles from './src/styles/common-styles.js';

class firebaseAuth extends Component {

    constructor(props) {
        super(props);

        const firebaseConfig = {
            apiKey: "AIzaSyCcKGHc2riqP5S7jarLPQ4gaDkyD_49YsE",
            authDomain: "timekeeper-d6272.firebaseapp.com",
            databaseURL: "https://timekeeper-d6272.firebaseio.com",
            storageBucket: "timekeeper-d6272.appspot.com",
            messagingSenderId: "251914286448",
        };

        this.fbApp = Firebase.initializeApp(firebaseConfig);

        this.state = {
            component: null,
            user: null,
            loaded: false
        };
    }

    getRef() {
        return fbApp;
    }

    componentWillMount() {

            //AsyncStorage.removeItem('user_data');
            //AsyncStorage.getItem('user_data').then((user_data_json) => {

            // console.log('index.ios.js');
            // 
            // let user_data = JSON.parse(user_data_json);
            // let SignUpComponent = {component: Signup, firebase: this.fbApp};
            // let AccountComponent = {component: Account, firebase: this.fbApp};
            // if(user_data != null){
            //   this.fbApp().authWithCustomToken(user_data.token, (error, authData) => {
            //     if(error){
            //       this.setState(SignUpComponent);
            //     }else{
            //       this.setState(AccountComponent);
            //     }
            //   });
            // }else{
            //   this.setState(SignUpComponent);
            // }
            // });

            let state = {
                component: null,
                firebase: this.fbApp
            };

            this.firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        state.component = Account;
                        state.user = user;
                    } else {
                        state.component = Signup;
                    }
                    
                    this.setState(state);
                }

                render() {

                    if (this.state.component) {
                        return ( <
                            Navigator initialRoute = {
                                {
                                    component: this.state.component,
                                    this.state.user,
                                    fbDB: this.firebase
                                }
                            }
                            configureScene = {
                                () => {
                                    return Navigator.SceneConfigs.FloatFromRight;
                                }
                            }
                            renderScene = {
                                (route, navigator) => {
                                    if (route.component) {
                                        return React.createElement(route.component, {
                                            navigator,
                                            user: route.user,
                                            fbDB: route.fbDB
                                        });
                                    }
                                }
                            }
                            />
                        );
                    } else {
                        return ( <
                            View style = {
                                styles.container
                            } >
                            <
                            Header text = "React Native Firebase Auth"
                            loaded = {
                                this.state.loaded
                            }
                            />   <
                            View style = {
                                styles.body
                            } > < /View> <
                            /View>
                        );
                    }
                }
            }

            AppRegistry.registerComponent('timeKeeper', () => firebaseAuth);