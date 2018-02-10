'use strict'

import React, {Component} from 'react'
import moment from 'moment'
import {screenHeight} from '../constants/dimensions'
import {
  View,
  Text,
  WebView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

export default class CalendarView extends Component {
  render() {
    const {props, state} = this
    const {featured} = props
    return (
      <ScrollView style={{width: '100%', height: screenHeight}}>
        <View style={{width: '100%', height: screenHeight*0.5}}>
        { !featured ? null :
          <View style={{flex: 1}}>
            <Text style={{fontSize: 20}}>{featured.title}</Text>
            <Text>{featured.venue.name}</Text>
            <Text>{moment(featured.startTime).format('MMM Do YYYY, HH:MM')}</Text>
            <View style={{flex: 1, backgroundColor: 'green'}}>
              <Map
                style={{width: '100%', height: 200, backgroundColor: 'pink'}}
                lat={featured.venue.geo.lat}
                lng={featured.venue.geo.lng} />
            </View>
          </View> }
        </View>
        { props.events.map((e,i) => {
            const feat = e.id === featured.id
            return(
              <TouchableOpacity
                onPress={() => props.fetchEvent(e.id)}
                style={{backgroundColor: feat?'pink':'transparent', paddingTop: 20, paddingBottom: 20, marginBottom: 20}}>
                <Text>{e.title}, {moment(e.startTime).format('MM/DD')}</Text>
              </TouchableOpacity>
            )
          })
        }
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
