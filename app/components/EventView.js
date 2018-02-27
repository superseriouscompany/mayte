import React, {Component} from 'react'
import EventInvite        from '../containers/EventInvite'
import moment             from 'moment'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      { props.loading ?
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      : !props.events ?
        null
      : !props.events.length ?
        <View style={styles.centered}>
          <Text>No events found.</Text>
        </View>
      :
        <EventInvite event={props.events[0]}/>
      }
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems:     'center',
    flex: 1,
  },
})
