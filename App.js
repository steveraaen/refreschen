    //touch of evil  witness for the prosecution
import React, { Component } from 'react';
import { Animated, Button, Platform, StyleSheet, Image, Text, View, ProgressViewIOS } from 'react-native';
import BackgroundFetch from "react-native-background-fetch";
import * as firebase from 'firebase';
import { CalendarList } from 'react-native-calendars' 
import moment from 'moment'
import axios from 'axios'/*
import countries from './utils/countries';*/

/*for(let i = 0; i < countries.length; i++) {
  console.log(countries[i].name, countries[i].flag)
}*/

var countries = [{flag: require("./utils/png/afghanistan.png"),name: "Afghanistan", schengen: false, europe: false},
{flag: require("./utils/png/albania.png"), name: "Albania", schengen: false, europe: true, colors: ['black', 'red']},
{flag: require("./utils/png/algeria.png"), name: "Algeria", schengen: false, europe: false},
{flag: require("./utils/png/andorra.png"), name: "Andorra", schengen: true, europe: true},
{flag: require("./utils/png/angola.png"), name: "Angola", schengen: false, europe: false},
{flag: require("./utils/png/anguilla.png"), name: "Anguilla", schengen: false, europe: false},
{flag: require("./utils/png/antigua-and-barbuda.png"), name: "Antigua & Barbuda", schengen: false, europe: false},
{flag: require("./utils/png/argentina.png"), name: "Argentina", schengen: false, europe: false},
{flag: require("./utils/png/armenia.png"), name: "Armenia", schengen: false, europe: true, colors:['gold', 'red', 'blue']},
{flag: require("./utils/png/australia.png"), name: "Australia", schengen: false, europe: false},
{flag: require("./utils/png/austria.png"), name: "Austria", schengen: true, europe: true},
{flag: require("./utils/png/azerbaijan.png"), name: "Azerbaijan", schengen: false, europe: false},
{flag: require("./utils/png/bahamas.png"), name: "Bahamas", schengen: false, europe: false},
{flag: require("./utils/png/bahrain.png"), name: "Bahrain", schengen: false, europe: false},
{flag: require("./utils/png/bangladesh.png"), name: "Bangladesh", schengen: false, europe: false},
{flag: require("./utils/png/barbados.png"), name: "Barbados", schengen: false, europe: false},
{flag: require("./utils/png/belarus.png"), name: "Belarus", schengen: false, europe: true},
{flag: require("./utils/png/belgium.png"), name: "Belgium", schengen: true, europe: true, colors: ['gold', 'red', 'black']},
{flag: require("./utils/png/belize.png"), name: "Belize", schengen: false, europe: false},
{flag: require("./utils/png/benin.png"), name: "Benin", schengen: false, europe: false},
{flag: require("./utils/png/bermuda.png"), name: "Bermuda", schengen: false, europe: false},
{flag: require("./utils/png/bhutan.png"), name: "Bhutan", schengen: false, europe: false},
{flag: require("./utils/png/bolivia.png"), name: "Bolivia", schengen: false, europe: false},
{flag: require("./utils/png/bosnia-and-herzegovina.png"), name: "Bosnia & Herzegovina", schengen: false, europe: true, colors:['white', 'red', 'blue']},
{flag: require("./utils/png/botswana.png"), name: "Botswana", schengen: false, europe: false},
{flag: require("./utils/png/brazil.png"), name: "Brazil", schengen: false, europe: false, colors:['green', 'yellow']},
{flag: require("./utils/png/brunei.png"), name: "Brunei Darussalam", schengen: false, europe: false},
{flag: require("./utils/png/bulgaria.png"), name: "Bulgaria", schengen: false, europe: true},
{flag: require("./utils/png/burkina-faso.png"), name: "Burkina Faso", schengen: false, europe: false},
{flag: require("./utils/png/afghanistan.png"), name: "Myanmar/Burma", schengen: false, europe: false},
{flag: require("./utils/png/burundi.png"), name: "Burundi", schengen: false, europe: false},
{flag: require("./utils/png/cambodia.png"), name: "Cambodia", schengen: false, europe: false},
{flag: require("./utils/png/cameroon.png"), name: "Cameroon", schengen: false, europe: false},
{flag: require("./utils/png/canada.png"), name: "Canada", schengen: false, europe: false, colors: ['white', 'red']},
/*{flag: require("./utils/png/cape-verdi.png"), name: "Cape Verde", schengen: false, europe: false},
*/{flag: require("./utils/png/cayman-islands.png"), name: "Cayman Islands", schengen: false, europe: false},
{flag: require("./utils/png/central-african-republic.png"), name: "Central African Republic", schengen: false, europe: false},
{flag: require("./utils/png/chad.png"), name: "Chad", schengen: false, europe: false},
{flag: require("./utils/png/chile.png"), name: "Chile", schengen: false, europe: false},
{flag: require("./utils/png/china.png"), name: "China", schengen: false, europe: false, colors: ['gold', 'red']},
{flag: require("./utils/png/colombia.png"), name: "Colombia", schengen: false, europe: false},
{flag: require("./utils/png/comoros.png"), name: "Comoros", schengen: false, europe: false},
{flag: require("./utils/png/afghanistan.png"), name: "Congo", schengen: false, europe: false},
{flag: require("./utils/png/costa-rica.png"), name: "Costa Rica", schengen: false, europe: false},
{flag: require("./utils/png/croatia.png"), name: "Croatia", schengen: false, europe: true, colors: ['red', 'white', 'blue']},
{flag: require("./utils/png/cuba.png"), name: "Cuba", schengen: false, europe: false},
{flag: require("./utils/png/cyprus.png"), name: "Cyprus", schengen: false, europe: true},
{flag: require("./utils/png/czech-republic.png"), name: "Czech Republic", schengen: true, europe: true, colors:['gold', 'red']},
{flag: require("./utils/png/afghanistan.png"), name: "The Congo", schengen: false, europe: false},
{flag: require("./utils/png/denmark.png"), name: "Denmark", schengen: true, europe: true, colors:['red', 'white']},
{flag: require("./utils/png/djibouti.png"), name: "Djibouti", schengen: false, europe: false},
{flag: require("./utils/png/dominica.png"), name: "Dominica", schengen: false, europe: false},
{flag: require("./utils/png/dominican-republic.png"), name: "Dominican Republic", schengen: false, europe: false},
{flag: require("./utils/png/ecuador.png"), name: "Ecuador", schengen: false, europe: false},
{flag: require("./utils/png/egypt.png"), name: "Egypt", schengen: false, europe: false, colors: ['red', 'white', 'black']},
{flag: require("./utils/png/afghanistan.png"), name: "El Salvador", schengen: false, europe: false},
{flag: require("./utils/png/equatorial-guinea.png"), name: "Equatorial Guinea", schengen: false, europe: false},
{flag: require("./utils/png/eritrea.png"), name: "Eritrea", schengen: false, europe: false},
{flag: require("./utils/png/estonia.png"), name: "Estonia", schengen: true, europe: true, colors: ['white', 'black', 'blue']},
{flag: require("./utils/png/ethiopia.png"), name: "Ethiopia", schengen: false, europe: false},
{flag: require("./utils/png/fiji.png"), name: "Fiji", schengen: false, europe: false},
{flag: require("./utils/png/finland.png"), name: "Finland", schengen: true, europe: true, colors: ['blue', 'white']},
{flag: require("./utils/png/france.png"), name: "France", schengen: true, europe: true, colors: ['red', 'white', 'blue']},
{flag: require("./utils/png/french-polynesia.png"), name: "French Guiana", schengen: false, europe: false},
{flag: require("./utils/png/gabon.png"), name: "Gabon", schengen: false, europe: false},
{flag: require("./utils/png/gambia.png"), name: "Gambia", schengen: false, europe: false},
{flag: require("./utils/png/georgia.png"), name: "Georgia", schengen: false, europe: true, colors:['white', 'red']},
{flag: require("./utils/png/germany.png"), name: "Germany", schengen: true, europe: true, colors: ['gold', 'black', 'red']},
{flag: require("./utils/png/ghana.png"), name: "Ghana", schengen: false, europe: false},
{flag: require("./utils/png/united-kingdom.png"), name: "Great Britain", schengen: false, europe: true, colors:['white', 'red', 'blue']},
{flag: require("./utils/png/greece.png"), name: "Greece", schengen: true, europe: true, colors:['white', 'blue']},
{flag: require("./utils/png/grenada.png"), name: "Grenada", schengen: false, europe: false},
{flag: require("./utils/png/united-nations.png"), name: "Guadeloupe", schengen: false, europe: false},
{flag: require("./utils/png/guatemala.png"), name: "Guatemala", schengen: false, europe: false},
{flag: require("./utils/png/guinea.png"), name: "Guinea", schengen: false, europe: false},
{flag: require("./utils/png/guinea-bissau.png"), name: "Guinea-Bissau", schengen: false, europe: false},
{flag: require("./utils/png/guyana.png"), name: "Guyana", schengen: false, europe: false},
{flag: require("./utils/png/haiti.png"), name: "Haiti", schengen: false, europe: false},
{flag: require("./utils/png/honduras.png"), name: "Honduras", schengen: false, europe: false},
{flag: require("./utils/png/hungary.png"), name: "Hungary", schengen: true, europe: true, colors:['white', 'red', 'green']},
{flag: require("./utils/png/iceland.png"), name: "Iceland", schengen: true, europe: true, colors:['blue', 'red', 'white']},
{flag: require("./utils/png/india.png"), name: "India", schengen: false, europe: false, colors:['green', 'white', 'gold']},
{flag: require("./utils/png/indonesia.png"), name: "Indonesia", schengen: false, europe: false},
{flag: require("./utils/png/iran.png"), name: "Iran", schengen: false, europe: false},
{flag: require("./utils/png/iraq.png"), name: "Iraq", schengen: false, europe: false, colors:['gold', 'green']},
{flag: require("./utils/png/ireland.png"), name: "Ireland", schengen: false, europe: true, colors: ['green', 'gold', 'white']},
{flag: require("./utils/png/israel.png"), name: "Israel and the Occupied Territories", schengen: false, europe: false, colors: ['blue', 'white']},
{flag: require("./utils/png/italy.png"), name: "Italy", schengen: true, europe: true, colors:['white', 'red', 'green']},
{flag: require("./utils/png/ivory-coast.png"), name: "Ivory Coast (Cote d'Ivoire)", schengen: false, europe: false},
{flag: require("./utils/png/jamaica.png"), name: "Jamaica", schengen: false, europe: false, colors: ['gold','black','green']},
{flag: require("./utils/png/japan.png"), name: "Japan", schengen: false, europe: false, colors: ['red', 'white']},
{flag: require("./utils/png/jordan.png"), name: "Jordan", schengen: false, europe: false},
{flag: require("./utils/png/kazakhstan.png"), name: "Kazakhstan", schengen: false, europe: false},
{flag: require("./utils/png/kenya.png"), name: "Kenya", schengen: false, europe: false},
{flag: require("./utils/png/kosovo.png"), name: "Kosovo", schengen: false, europe: true},
{flag: require("./utils/png/kuwait.png"), name: "Kuwait", schengen: false, europe: false},
{flag: require("./utils/png/kyrgyzstan.png"), name: "Kyrgyz Republic (Kyrgyzstan)", schengen: false, europe: false},
{flag: require("./utils/png/laos.png"), name: "Laos", schengen: false, europe: false},
{flag: require("./utils/png/latvia.png"), name: "Latvia", schengen: true, europe: true, colors: ['white', 'purple']},
{flag: require("./utils/png/lebanon.png"), name: "Lebanon", schengen: false, europe: false, colors: ['red','white','green']},
{flag: require("./utils/png/lesotho.png"), name: "Lesotho", schengen: false, europe: false},
{flag: require("./utils/png/liberia.png"), name: "Liberia", schengen: false, europe: false},
{flag: require("./utils/png/libya.png"), name: "Libya", schengen: false, europe: false},
{flag: require("./utils/png/liechtenstein.png"), name: "Liechtenstein", schengen: true, europe: true},
{flag: require("./utils/png/lithuania.png"), name: "Lithuania", schengen: true, europe: true, colors: ['gold', 'red', 'green']},
{flag: require("./utils/png/luxembourg.png"), name: "Luxembourg", schengen: true, europe: true, colors: ['red', 'white', 'lightblue']},
/*{flag: require("./utils/png/macedonia.png"), name: "Macedonia", schengen: false, europe: true, colors: ['red', 'gold']},
*/{flag: require("./utils/png/madagascar.png"), name: "Madagascar", schengen: false, europe: false},
{flag: require("./utils/png/malawi.png"), name: "Malawi", schengen: false, europe: false},
{flag: require("./utils/png/malaysia.png"), name: "Malaysia", schengen: false, europe: false},
{flag: require("./utils/png/maldives.png"), name: "Maldives", schengen: false, europe: false},
{flag: require("./utils/png/mali.png"), name: "Mali", schengen: false, europe: false},
{flag: require("./utils/png/malta.png"), name: "Malta", schengen: true, europe: true, colors: ['red', 'white']},
{flag: require("./utils/png/martinique.png"), name: "Martinique", schengen: false, europe: false},
{flag: require("./utils/png/mauritania.png"), name: "Mauritania", schengen: false, europe: false},
{flag: require("./utils/png/mauritius.png"), name: "Mauritius", schengen: false, europe: false},
/*{flag: require("./utils/png/mayotte.png"), name: "Mayotte", schengen: false, europe: false},
*/{flag: require("./utils/png/mexico.png"), name: "Mexico", schengen: false, europe: false, colors: ['red', 'white', 'green']},
{flag: require("./utils/png/moldova.png"), name: "Moldova, Republic of", schengen: false, europe: true},
{flag: require("./utils/png/monaco.png"), name: "Monaco", schengen: false, europe: true, colors: ['red', 'white']},
{flag: require("./utils/png/mongolia.png"), name: "Mongolia", schengen: false, europe: false},
{flag: require("./utils/png/montenegro.png"), name: "Montenegro", schengen: false, europe: true},
{flag: require("./utils/png/montserrat.png"), name: "Montserrat", schengen: false, europe: false},
{flag: require("./utils/png/morocco.png"), name: "Morocco", schengen: false, europe: false},
{flag: require("./utils/png/mozambique.png"), name: "Mozambique", schengen: false, europe: false},
{flag: require("./utils/png/namibia.png"), name: "Namibia", schengen: false, europe: false},
{flag: require("./utils/png/nepal.png"), name: "Nepal", schengen: false, europe: false, colors: ['red','white', 'blue']},
{flag: require("./utils/png/netherlands.png"), name: "Netherlands", schengen: true, europe: true, colors:['orange', 'white', 'blue']},
{flag: require("./utils/png/new-zealand.png"), name: "New Zealand", schengen: false, europe: false},
{flag: require("./utils/png/nicaragua.png"), name: "Nicaragua", schengen: false, europe: false},
{flag: require("./utils/png/niger.png"), name: "Niger", schengen: false, europe: false},
{flag: require("./utils/png/nigeria.png"), name: "Nigeria", schengen: false, europe: false},
{flag: require("./utils/png/north-korea.png"), name: "North Korea", schengen: false, europe: false},
{flag: require("./utils/png/norway.png"), name: "Norway", schengen: true, europe: true, colors:['white', 'red', 'blue']},
{flag: require("./utils/png/oman.png"), name: "Oman", schengen: false, europe: false},
{flag: require("./utils/png/pakistan.png"), name: "Pakistan", schengen: false, europe: false},
{flag: require("./utils/png/panama.png"), name: "Panama", schengen: false, europe: false},
{flag: require("./utils/png/papua-new-guinea.png"), name: "Papua New Guinea", schengen: false, europe: false},
{flag: require("./utils/png/paraguay.png"), name: "Paraguay", schengen: false, europe: false},
{flag: require("./utils/png/peru.png"), name: "Peru", schengen: false, europe: false},
{flag: require("./utils/png/philippines.png"), name: "Philippines", schengen: false, europe: false},
{flag: require("./utils/png/united-nations.png"), name: "Poland", schengen: true, europe: true, colors:['white', 'red']},
{flag: require("./utils/png/portugal.png"), name: "Portugal", schengen: true, europe: true, colors: ['red', 'green']},
{flag: require("./utils/png/puerto-rico.png"), name: "Puerto Rico", schengen: false, europe: false},
{flag: require("./utils/png/qatar.png"), name: "Qatar", schengen: false, europe: false},
{flag: require("./utils/png/romania.png"), name: "Romania", schengen: false, europe: true, colors:['gold', 'white', 'blue']},
{flag: require("./utils/png/russia.png"), name: "Russian Federation", schengen: false, europe: true, colors:['white', 'red', 'blue']},
{flag: require("./utils/png/rwanda.png"), name: "Rwanda", schengen: false, europe: false},
{flag: require("./utils/png/saint-kitts-and-nevis.png"), name: "Saint Kitts &Nevis", schengen: false, europe: false},
{flag: require("./utils/png/united-nations.png"), name: "Saint Lucia", schengen: false, europe: false},
{flag: require("./utils/png/united-nations.png"), name: "Saint Vincent's & Grenadines", schengen: false, europe: false},
{flag: require("./utils/png/united-nations.png"), name: "Samoa", schengen: false, europe: false},
{flag: require("./utils/png/sao-tome-and-principe.png"), name: "Sao Tome & Principe", schengen: false, europe: false},
{flag: require("./utils/png/saudi-arabia.png"), name: "Saudi Arabia", schengen: false, europe: false, colors: ['green', 'white']},
{flag: require("./utils/png/senegal.png"), name: "Senegal", schengen: false, europe: false},
{flag: require("./utils/png/serbia.png"), name: "Serbia", schengen: false, europe: true, colors:['white', 'red', 'blue']},
{flag: require("./utils/png/seychelles.png"), name: "Seychelles", schengen: false, europe: false},
{flag: require("./utils/png/sierra-leone.png"), name: "Sierra Leone", schengen: false, europe: false},
{flag: require("./utils/png/singapore.png"), name: "Singapore", schengen: false, europe: false},
{flag: require("./utils/png/slovakia.png"), name: "Slovakia", schengen: true, europe: true, colors:['red', 'blue','white' ]},
{flag: require("./utils/png/slovenia.png"), name: "Slovenia", schengen: true, europe: true, colors:['white', 'red', 'blue']},
{flag: require("./utils/png/somaliland.png"), name: "Solomon Islands", schengen: false, europe: false, colors:['blue', 'red', 'white']},
{flag: require("./utils/png/somalia.png"), name: "Somalia", schengen: false, europe: false},
{flag: require("./utils/png/south-africa.png"), name: "South Africa", schengen: false, europe: false, colors:['gold', 'green', 'black']},
{flag: require("./utils/png/south-korea.png"), name: "Korea, South Korea", schengen: false, europe: false, colors:['blue', 'red', 'black']},
{flag: require("./utils/png/south-sudan.png"), name: "South Sudan", schengen: false, europe: false},
{flag: require("./utils/png/spain.png"), name: "Spain", schengen: true, europe: true, colors:['red', 'gold']},
{flag: require("./utils/png/sri-lanka.png"), name: "Sri Lanka", schengen: false, europe: false},
{flag: require("./utils/png/sudan.png"), name: "Sudan", schengen: false, europe: false},
{flag: require("./utils/png/suriname.png"), name: "Suriname", schengen: false, europe: false},
{flag: require("./utils/png/swaziland.png"), name: "Swaziland", schengen: false, europe: false},
{flag: require("./utils/png/sweden.png"), name: "Sweden", schengen: true, europe: true, colors: ['gold', 'blue']},
{flag: require("./utils/png/switzerland.png"), name: "Switzerland", schengen: true, europe: true, colors: ['red', 'white']},
{flag: require("./utils/png/syria.png"), name: "Syria", schengen: false, europe: false},
{flag: require("./utils/png/tajikistan.png"), name: "Tajikistan", schengen: false, europe: false},
{flag: require("./utils/png/tanzania.png"), name: "Tanzania", schengen: false, europe: false},
{flag: require("./utils/png/thailand.png"), name: "Thailand", schengen: false, europe: false},
{flag: require("./utils/png/togo.png"), name: "Togo", schengen: false, europe: false},
{flag: require("./utils/png/trinidad-and-tobago.png"), name: "Trinidad & Tobago", schengen: false, europe: false},
{flag: require("./utils/png/tunisia.png"), name: "Tunisia", schengen: false, europe: false},
{flag: require("./utils/png/turkey.png"), name: "Turkey", schengen: false, europe: true, colors: ['red', 'white']},
{flag: require("./utils/png/turkmenistan.png"), name: "Turkmenistan", schengen: false, europe: false},
{flag: require("./utils/png/turks-and-caicos.png"), name: "Turks & Caicos Islands", schengen: false, europe: false},
{flag: require("./utils/png/uganda.png"), name: "Uganda", schengen: false, europe: false},
{flag: require("./utils/png/ukraine.png"), name: "Ukraine", schengen: false, europe: true},
{flag: require("./utils/png/united-arab-emirates.png"), name: "United Arab Emirates", schengen: false, europe: false},
{flag: require("./utils/png/united-states-of-america.png"), name: "United States", schengen: false, europe: false, colors: ['red', 'white', 'blue']},
{flag: require("./utils/png/uruguay.png"), name: "Uruguay", schengen: false, europe: false},
{flag: require("./utils/png/uzbekistn.png"), name: "Uzbekistan", schengen: false, europe: false},
{flag: require("./utils/png/venezuela.png"), name: "Venezuela", schengen: false, europe: false},
{flag: require("./utils/png/vietnam.png"), name: "Vietnam", schengen: false, europe: false},
{flag: require("./utils/png/united-kingdom.png"), name: "UK Virgin Islands", schengen: false, europe: false},
{flag: require("./utils/png/united-states-of-america.png"), name: "US Virgin Islands", schengen: false, europe: false},
{flag: require("./utils/png/yemen.png"), name: "Yemen", schengen: false, europe: false},
{flag: require("./utils/png/zambia.png"), name: "Zambia", schengen: false, europe: false},
{flag: require("./utils/png/zimbabwe.png"), name: "Zimbabwe", schengen: false, europe: false}
]





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
database= firebase.database()
export default class App extends Component {
  constructor(props) {
    initialState = {
      [_today]: {}
      }
    super(props);    
      this.state={
        test: 'A',
        _markedDates: initialState,
        col: 'white',
        daysInEU: 0,
        daysLeft: 90,
        fadeAnim:  new Animated.Value(0)
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
            }, ()=> console.log(this.state.uLnglat))
/*      this.watchId = navigator.geolocation.watchPosition(
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

)*/}.bind(this))
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
console.log(doc)
        for (let i = 0; i < countries.length; i++) {
          var plnm = doc.data.results[0].address_components
          if(plnm[4].long_name === countries[i].name || plnm[5].long_name === countries[i].name || plnm[6].long_name === countries[i].name) {
            var cctry = countries[i]
           console.log(cctry.name)
           var curOut = !cctry.europe && !cctry.schengen;
           var curIn = cctry.schengen
           var curNear = !cctry.schengen && cctry.europe
           var flag = countries[i].flag
           this.setState({
              ctry: cctry.name,
              flag: flag,
              curOut: curOut,
              curIn: curIn,
              curNear: curNear,
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
    componentDidMount() {
     console.log(firebaseApp.database())
     console.log(firebaseApp.auth())
  // configure, set test BG Fetch
    BackgroundFetch.configure({
      minimumFetchInterval: 15,
 
    }, () => {
      console.log("[js] Received background-fetch event");
     this.setState({timeNow: moment().format(), curCol: 'yellow'})
     this.checkToday()
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

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
    
    this.setState({
      authObj: firebase.auth(),
      isAuthenticated: true,
      uid: firebase.auth().currentUser.uid,
    }, () => {
/*              database.ref('users/' + this.state.uid).set({
                 uid: this.state.uid
              });*/
             database.ref('users/' + this.state.uid).on('value', (snapshot) =>{
         this.setState({
          snp: snapshot.val(),
          daysInEU: snapshot.val().daysInEU,
          daysLeft: snapshot.val().daysLeft,
          lastDay: moment().add(snapshot.val().daysLeft, 'days').format('MMMM Do YYYY'),
          mkddts: snapshot.val().markedDates
        }, () => {

      this.setState({ _markedDates: this.state.mkddts }, () =>
          this.calcDays(this.state._markedDates)
        );
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

    )}.bind(this))
  }
  render() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 10000,              // Make it take a while
      }
    ).start();   
    return (


      <View style={styles.container}>
        
        <View style={{marginTop: 32, marginBottom: 6}}><Text style={{fontSize: 14, color: 'gray', textAlign: 'center'}}>You are in</Text></View>

        <View style={{flexDirection: 'row', justifyContent: 'center', height:40}}> 
          <View style={{paddingBottom: 6}}><Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>{this.state.ctry}</Text></View>
          <View style={{marginLeft: 20, marginTop: 4}}><Image source={this.state.flag} style={{width: 30, height: 30}}/></View>
        </View>
      
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 28}}>
        <View style={{flex: .5}}><Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>Days In</Text></View>
        <View style={{flex: .5}}><Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>Days Left</Text></View>
        </View>
        <View style={{flexDirection: 'row'}}>
        <View style={{flex: .5}}><Text style={{color: 'white', fontSize: 24, textAlign: 'center'}}>{this.state.daysInEU}</Text></View>
        <View style={{flex: .5}}><Text style={{color: 'white', fontSize: 24, textAlign: 'center'}}>{this.state.daysLeft}</Text></View>
        </View>
      
      <View style={{marginTop: 24, marginBottom: 24}}><ProgressViewIOS  progressTintColor='red' trackTintColor='green' progress={this.state.daysInEU / 90}/></View>
      <View>
           <CalendarList
                horizontal={true}
                style={{marginTop: 1}}           
                theme={{ calendarBackground: 'black', dayTextColor: 'green', dotColor: 'red', monthTextColor: 'white', selectedDayTextColor: 'red'}}
                pastScrollRange={3}
                futureScrollRange={0}
                onDayPress={this.onDaySelect}
                markedDates={this.state._markedDates}
                markingType={'period'}
            /> 
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
         <View style={{alignItems: 'center', marginBottom: 6}}><Text style={{fontSize: 14, color: 'gray'}}>You can stay until</Text></View>
        <View style={{alignItems: 'center', marginBottom: 8}}><Text style={{color: this.state.col, fontSize: 18, fontWeight: 'bold'}}>{this.state.lastDay}</Text></View>
        </View>
        <View style={{alignItems: 'center'}}><Text style={{color: this.state.col}}>{this.state.temp}</Text></View>
        <View style={{alignItems: 'center'}}><Text style={{color: this.state.col}}>{this.state.timeNow}</Text></View>
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
