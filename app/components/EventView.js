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
      { props.event ?
        <EventInvite event={props.event}/>
      :
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
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
