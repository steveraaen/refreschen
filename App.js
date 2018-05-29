
import React, { Component } from 'react';
import { Button, Platform, StyleSheet, Text, View, ProgressViewIOS } from 'react-native';
import BackgroundFetch from "react-native-background-fetch";
import * as firebase from 'firebase';
import { CalendarList } from 'react-native-calendars' 
import moment from 'moment'
import axios from 'axios'

import ctrylist from './utils/countries';

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = _today
const _minDate = moment().subtract(90, 'days').format(_format)
// configure & initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyCpzqnDrYn_6D0QGdVlGXspkEOM2M5G-Jw",
    authDomain: "schengentracker.firebaseapp.com",
    databaseURL: "https://schengentracker.firebaseio.com",
    projectId: "schengentracker",
    storageBucket: "schengentracker.appspot.com",
    messagingSenderId: "330964828818"
  };
 const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  constructor(props) {
    initialState = {
      [_today]: {}
      }
    super(props);    
      this.state={
        test: 'A',
        _markedDates: initialState,
      }
      this.revGeocode = this.revGeocode.bind(this)
      this.onDaySelect = this.onDaySelect.bind(this)
      this.calcDays = this.calcDays.bind(this)
      this.writeUserData = this.writeUserData.bind(this)
      this.checkToday = this.checkToday.bind(this)
  } 
  writeUserData(uid, mkd, wdi, wdl) {
      console.log('clicked')
      database.ref('users/' + uid).set({
         uid: uid,
        markedDates: mkd,
        daysInEU: wdi,
        daysLeft: wdl
      });
    } 
  checkToday() {
    this.revGeocode().then(() => {
      if(this.state.curIn) 
        this.setState({curCol: 'yellow'})
    })
  }
  onDaySelect(day) { 
      const _selectedDay = moment(day.dateString).format(_format);      
      /*let marked = true;*/
      let selected = true;
      console.log(_selectedDay)
      if (this.state._markedDates[_selectedDay]) {
      /*  marked = this.state._markedDates[_selectedDay].marked;*/
        selected = !this.state._markedDates[_selectedDay].selected;
      }
      const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { /*marked,*/ selected } } }
      this.setState({ _markedDates: updatedMarkedDates }, () =>
          this.calcDays(this.state._markedDates)
        );
  }
  calcDays(mds) {
    console.log(mds)
    var mkdarr = []
    for( let mkds in mds) {
      if(mds[mkds].selected) {
        mkdarr.push(mds[mkds])
      }
      console.log(mkdarr)
      this.setState({
        daysInEU: mkdarr.length,
        daysLeft: 90 - mkdarr.length
      }, () => {
        this.writeUserData(this.state.uid, this.state._markedDates, this.state.daysInEU, this.state.daysLeft)
      })
    }
  } 
    revGeocode(lat, lng) {      
    var lat= parseFloat(this.state.uLatitude).toFixed(6); 
      var lng= parseFloat(this.state.uLatitude).toFixed(6) ;

     return axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + parseFloat(this.state.uLatitude).toFixed(6) +',' + parseFloat(this.state.uLongitude).toFixed(6) + '&key=AIzaSyD0Zrt4a_yUyZEGZBxGULidgIWK05qYeqs', {
        }).then((doc) => {

        for (let i = 0; i < ctrylist.length; i++) {
          var plnm = doc.data.results[0].address_components
          if(plnm[4].long_name === ctrylist[i].name || plnm[5].long_name === ctrylist[i].name || plnm[6].long_name === ctrylist[i].name) {
            var cctry = ctrylist[i]
           console.log(cctry.name)
           var curOut = !cctry.europe && !cctry.schengen;
           var curIn = cctry.schengen
           var curNear = !cctry.schengen && cctry.europe
           this.setState({
              ctry: cctry.name,
              curOut: curOut,
              curIn: curIn,
              curNear: curNear
                  }, () => {
                    if(this.state.curIn) {
                      this.setState({curCol: 'red'})
                    } else if(this.state.curNear) {
                      this.setState({curCol: 'green'})
                    } else if(this.state.curOut) {
                      this.setState({curCol: 'blue'})
                    }
                  })
                  }
                }

          this.setState({            
            address:  doc.data.results[0].formatted_address.split(",")[0] + ", " + doc.data.results[0].formatted_address.split(",")[1],
            latitude: doc.data.results[0].geometry.location[1],
            longitude: doc.data.results[0].geometry.location[0],
            placeName: doc.data.results[0]
          })
        }).catch(function(error) {
       throw error
    }); 
  }
    componentWillMount() {
     console.log(firebaseApp.database())
     console.log(firebaseApp.auth())
// configure, set test BG Fetch
    BackgroundFetch.configure({
      minimumFetchInterval: 15,
    }, () => {
      console.log("[js] Received background-fetch event");
      /*this.setState({test: "B"})*/
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });
    BackgroundFetch.start(()=> this.setState({curTime: moment().format(_format)}))
    BackgroundFetch.status((status) => {
      switch(status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });
// authenticate user and get initial snapshot  
  firebase.auth().signInAnonymously()
  .then(() => {
    console.log(firebase.auth().currentUser.uid)
    database= firebase.database()
    this.setState({
      authObj: firebase.auth(),
      isAuthenticated: true,
      uid: firebase.auth().currentUser.uid,
    }, () => {
              database.ref('users/' + this.state.uid).set({
                 uid: this.state.uid
              });
             database.ref('users/' + this.state.uid).on('value', (snapshot) =>{
         this.setState({
          snp: snapshot.val(),
          daysInEU: snapshot.val().daysInEU,
          daysLeft: snapshot.val().daysLeft,
          lastDay: moment().add(snapshot.val().daysInEU, 'days').format('MMMM Do YYYY'),
          mkddts: snapshot.val().markedDates
        })
         console.log(snapshot.val())
      }) 
    });
  });
// Get geolocation
       navigator.geolocation.getCurrentPosition(function(pos) {
            var { longitude, latitude, accuracy, heading } = pos.coords
            this.setState({
                uLongitude: pos.coords.longitude,
                uLatitude: pos.coords.latitude,
                uLnglat: [pos.coords.longitude, pos.coords.latitude],
                uPosition: pos.coords,
                deviceLng: pos.coords.longitude,
                deviceLat: pos.coords.latitude,
                loading: false
            })
      this.watchId = navigator.geolocation.watchPosition(
      (position) => {
            this.setState({
                uLatitude: position.coords.latitude,
                uLongitude: position.coords.longitude,
                uPosition: position.coords,
                deviceLng: pos.coords.longitude,
                deviceLat: pos.coords.latitude,
         error: null,
        },() => this.revGeocode(this.state.deviceLat, this.state.deviceLng));      
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true,  distanceFilter: 50 },

)      
        }.bind(this))
  }
  render() {
    return (


      <View style={styles.container}>
      <View style={{marginTop: 38}}><Text style={{fontSize: 14, color: 'gray', textAlign: 'center'}}>You are in  <Text style={{fontSize: 22, color: 'white'}}>{this.state.ctry}</Text></Text></View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 28}}>
        <View style={{flex: .5}}><Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>Days In</Text></View>
        <View style={{flex: .5}}><Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>Days Left</Text></View>
        </View>
        <View style={{flexDirection: 'row'}}>
        <View style={{flex: .5}}><Text style={{color: 'white', fontSize: 24, textAlign: 'center'}}>{this.state.daysInEU}</Text></View>
        <View style={{flex: .5}}><Text style={{color: 'white', fontSize: 24, textAlign: 'center'}}>{this.state.daysLeft}</Text></View>
        </View>
      
      <View style={{marginTop: 14, marginBottom: 14}}><ProgressViewIOS  progressTintColor='red' trackTintColor='green' progress={this.state.daysInEU / 90}/></View>

     
            <CalendarList
                horizontal={true}
                style={{marginTop: 1}}           
                theme={{ calendarBackground: 'black', dayTextColor: 'green', dotColor: 'red', monthTextColor: 'white', selectedDayBackgroundColor: this.state.curCol,}}
                pastScrollRange={3}
                futureScrollRange={0}
                onDayPress={this.onDaySelect}
                markedDates={this.state._markedDates}
             
            /> 
        <View style={{alignItems: 'center'}}><Text style={{color: 'yellow'}}>{this.state.curTime}</Text></View>
            <Button title="check" onPress={() => this.checkToday()}><Text style={{color: 'white'}}> Check</Text></Button> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 /*   justifyContent: 'center',*/
  
    backgroundColor: 'black'
  }
});
