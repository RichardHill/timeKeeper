'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  StyleSheet,
  DatePickerIOS,
  Picker,
  View,
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import LogTime from './logtime';
import ViewTine from './viewtime';
import Landing from './landing';

import styles from '../styles/common-styles.js';

export default class logtime extends Component {

  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

  constructor(props){
    super(props);
    
    console.log(props);
    
    this.fbDB = props.fbDB;
        
    this.state = {
      loaded: true,
      task: '',
      time: '',
      password: '',
      date: this.props.date,
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
    };
  }
  
  onDateChange = (date) => {
    this.setState({date: date});
  };
  
  onTimeChange = (time) => {
    this.setState({time: time});
  };
  
  onTimezoneChange = (event) => {
    
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    
    this.setState({timeZoneOffsetInHours : offset});
    
  };
  
  logtime(){

  }
  
  submitTime() {
    
    //var employeesRef = this.fbDB.database().ref('/employees/');
    //var employeeRef = employeesRef.ref('richardhill@hotmail.com');
    
    // this.fbDB.database().ref('/').set({
    //   id : recordID,
    //   date: this.state.date,
    //   duration_hours: this.state.hours,
    //   duration_minutes: this.state.minutes,
    //   task_description: this.state.task  
    // });
    
    // this.fbDB.database().ref('/').set({
    //     username: "test",
    //     email: "richardhilHill@mail.com"
    // });  
    
    //Store an id for the record.
    var recordID = Math.floor((Math.random() * 10000000) + 1);
    var hours = this.state.hours === undefined ? 0 : this.state.hours;
    var minutes = this.state.minutes === undefined ? 0 : this.state.minutes;
    var task = this.state.task === undefined ? '' : this.state.task;
    
    this.fbDB.database().ref('/employers/soverign/employees/'+ 'helenhill/'+ recordID ).set({
      date: this.state.date.getDate() + '/' + (this.state.date.getMonth() + 1) + '/' +  this.state.date.getFullYear(),
      duration_hours: hours,
      duration_minutes: minutes,
      task_description: task 
    });
        
  }
  
  gotoLanding() {
    this.props.navigator.push({
      component: Landing,
      fbDB: this.fbDB
    });
  }

  render() {
    return (
      <View style={styles.container}>
      
        <Header text="Log Time" loaded={this.state.loaded} />
        
        <View style={{ flex: -1,
            backgroundColor: '#F5FCFF'}}>
          <Text>Date of Task</Text>
          <DatePickerIOS
            date={this.state.date}
            mode="date"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange}
          />
            
          <Text>Time Taken</Text>
          
          <View style={{flex:-1, flexDirection: 'row', justifyContent: 'space-around', height: 20}}>
            <Text>Hours</Text>           
            <Text>Minutes</Text>
          </View>
          
          <View style={{flex: -1, flexDirection: 'row', justifyContent: 'space-around', borderWidth: 1}}>
            <Picker style={{width: 100}}
              selectedValue={this.state.hours}
              onValueChange={(hrs) => this.setState({hours: hrs})}>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />
              <Picker.Item label="13" value="13" />
              <Picker.Item label="14" value="14" />
              <Picker.Item label="15" value="15" />
              <Picker.Item label="16" value="16" />
              <Picker.Item label="17" value="17" />
              <Picker.Item label="18" value="18" />
              <Picker.Item label="19" value="19" />
              <Picker.Item label="20" value="20" />
              <Picker.Item label="21" value="21" />
              <Picker.Item label="22" value="22" />
              <Picker.Item label="23" value="23" />
            </Picker>
          
            <Picker 
              style={{width: 100}}
              selectedValue={this.state.minutes}
              onValueChange={(mins) => this.setState({minutes: mins})}>
              <Picker.Item label="15" value="15" />
              <Picker.Item label="30" value="30" />
              <Picker.Item label="45" value="45" />
              <Picker.Item label="59" value="59" />
            </Picker>
          </View>            

                <Text>Description Of Task</Text>
                <TextInput
                  style={{height: 40,borderWidth: 1}}
                  onChangeText={(text) => this.setState({task: text})}
                  value={this.state.task}
                  placeholder={"Task Description"}
                />
                
                <Button
                  text="Submit"
                  onpress={this.submitTime.bind(this)}
                  button_styles={styles.primary_button}
                  button_text_styles={styles.primary_button_text} />

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
  },
  btn_return_text: {
    alignItems:'center',
    justifyContent:'center',
    height: 40,
  }
  
});

AppRegistry.registerComponent('logtime', () => logtime);
