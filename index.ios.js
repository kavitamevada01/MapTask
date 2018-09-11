/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';

import BackgroundGeolocation from "react-native-background-geolocation";
import * as firebase from 'firebase';

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBZWDC6LjwmU8E5hfTHo9_QgtdYiYyFcKs",
  authDomain: "mapdemo-b3431.firebaseapp.com",
  databaseURL: "https://mapdemo-b3431.firebaseio.com",
  storageBucket: "mapdemo-b3431.appspot.com",
  messagingSenderId: "397659795264"
};
firebase.initializeApp(firebaseConfig);
var GetLocation="";
var UserID="";
export default class MapTest extends Component {
  constructor(props) { 
    super(props); 
    this.state = {valLocationChange: "",valMotionChange:"",fireUser:"kavita123"};
     UserID = this.state.fireUser;
    // this.UpdateStateData = this.UpdateStateData.bind(this);
  }
  componentWillMount() {

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);

    // Now configure the plugin.
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: false, // <-- enable for debug sounds & notifications
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'http://posttestserver.com/post.php?dir=cordova-background-geolocation',
      autoSync: true,         // <-- POST each location immediately to server
      params: {               // <-- Optional HTTP params
        "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      }
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }
  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
  }

  onLocation(location) {
	  alert(JSON.stringify(location));
    console.log('- [js]location: ', JSON.stringify(location));
    GetLocation = location; 
	//Still this function not call. string not display in label
 this.UpdateStateData.bind(this);
   firebase.database().ref().child('coordinates/')
        .update({ Longitude: location.coords.longitude, Latitude: location.coords.latitude});
  }
  onMotionChange(location) {
	    alert(JSON.stringify(location));
    console.log('- [js]motionchanged: ', JSON.stringify(location));
	/*
     GetLocation = location;
	 //Still this function not call. string not display in label
   this.UpdateStateData.bind(this);
     firebase.database().ref().child('coordinates/')
        .update({ Longitude: "location.longitude", Latitude: "location.latitude" });
		*/
        
  }
  render() {
    return (
      <View style={styles.container}>
    <TextInput style={styles.fieldValue,styles.inputField}  onChangeText={(fireUser) => this.setState({fireUser})} value={this.state.fireUser}/>
      <Text style={styles.welcome}> LocationChange:  </Text>
        <Text style={styles.instructions}>{this.state.valLocationChange} </Text>
    <Text style={styles.welcome}> MotionChange:  </Text>
        <Text style={styles.instructions}>{this.state.valMotionChange} </Text>
    
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
   UpdateStateData(event) {
	   alert("dfdf");
    this.setState({valLocationChange:JSON.stringify(GetLocation)});
    UserID = this.state.fireUser;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MapTest', () => MapTest);
