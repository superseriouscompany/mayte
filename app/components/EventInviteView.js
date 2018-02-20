'use strict'

import React, {Component} from 'react'
import moment             from 'moment'
import {screenHeight, em} from '../constants/dimensions'
import {ButtonBlack}      from './Button'
import Text               from './Text'
import {
  View,
  WebView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class EventInviteView extends Component {
  render() {
    const {props, state} = this
    const {event} = props
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.title}</Text>
          <Text>{event.venue.name}</Text>
          <Text>{moment(event.startTime).format('MMM Do YYYY, HH:MM')}</Text>
        </View>
        <View style={styles.mapCont}>
          <Map
            style={styles.map}
            lat={event.venue.geo.latitude}
            lng={event.venue.geo.longitude} />
        </View>
        <ButtonBlack style={styles.rsvp} text="RSVP" onPress={() => props.rsvp(event.id, props.user, true)} />
        <TouchableOpacity onPress={() => props.rsvp(event.id, props.user, false)}>
          <Text style={styles.decline}>No Thanks</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}


class Map extends Component {
  render() {
    return(
      <WebView
        source={{html: `
          <!DOCTYPE html>
            <html>
            <head>
              <style>
                body {margin: 0;}
                #map {width: 100vw; height: 100vh}
              </style>
            </head>
            <body>
            <div id="map" style="width: 100vw, height: 100vh"></div>
            <script>
              function initMap() {
                var myLatLng = {lat: ${this.props.lat}, lng: ${this.props.lng}}
                var map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                zoom: 16,
                styles: [
                  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                  {elementType: 'labels.text.fill', stylers: [{color: '#ffffff'}]},
                  { stylers: [{color: '#d59563'}], featureType: 'administrative.locality', elementType: 'labels.text.fill' },
                  { featureType: 'poi.business', stylers: [{visibility: 'off'}] },
                  { stylers: [{color: '#d59563'}], featureType: 'poi', elementType: 'labels.text.fill' },
                  { stylers: [{color: '#263c3f'}], featureType: 'poi.park', elementType: 'geometry' },
                  { stylers: [{color: '#6b9a76'}], featureType: 'poi.park', elementType: 'labels.text.fill' },
                  { stylers: [{color: '#38414e'}], featureType: 'road', elementType: 'geometry' },
                  { stylers: [{color: '#212a37'}], featureType: 'road', elementType: 'geometry.stroke' },
                  { stylers: [{color: '#9ca5b3'}], featureType: 'road', elementType: 'labels.text.fill' },
                  { stylers: [{color: '#746855'}], featureType: 'road.highway', elementType: 'geometry' },
                  { stylers: [{color: '#1f2835'}], featureType: 'road.highway', elementType: 'geometry.stroke' },
                  { stylers: [{color: '#f3d19c'}], featureType: 'road.highway', elementType: 'labels.text.fill' },
                  { stylers: [{color: '#2f3948'}], featureType: 'transit', elementType: 'geometry' },
                  { stylers: [{color: '#d59563'}], featureType: 'transit.station', elementType: 'labels.text.fill' },
                  { stylers: [{color: '#17263c'}], featureType: 'water', elementType: 'geometry' },
                  { stylers: [{color: '#515c6d'}], featureType: 'water', elementType: 'labels.text.fill' },
                  { stylers: [{color: '#17263c'}], featureType: 'water', elementType: 'labels.text.stroke'   },
                  { stylers: [{visibility: 'off'}], featureType: 'poi.medical' },
                  { stylers: [{visibility: 'off'}], featureType: 'poi.attraction' }
                ]
                });

                var marker = new google.maps.Marker({position: myLatLng,map: map,icon: 'https://i.imgur.com/pAfQ1Zj.png'});
              }
            </script>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCRJdtX0kyQSeEj0zEuYBr-wLCXBtQo5bY&callback=initMap" async defer></script>
          </body>
          </html>
        `}}
        style={this.props.style} />
    )
  }
}

const styles = StyleSheet.create({
  container: {width: '100%', height: screenHeight},
  content: {alignItems: 'center'},
  header: {width: '100%'},
  title: {fontSize: em(2)},
  mapCont: {width: '100%', padding: em(1)},
  map: {width: '100%', height: 300, backgroundColor: 'pink'},
  rsvp: {marginTop: em(1), paddingLeft: em(2), paddingRight: em(2)},
  decline: {marginTop: em(1), textDecorationLine: 'underline'},
})
