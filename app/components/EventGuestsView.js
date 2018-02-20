'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class EventGuests extends Component {
  render() {
    const {props} = this

    return (
      <View style={styles.container}>
        <Text>There will be guests:</Text>
        {
          props.event.rsvp.yes.map((u,i) => <View key={i}><Text>{u.fullName}</Text></View>)
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
