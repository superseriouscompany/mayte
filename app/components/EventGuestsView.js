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
          props.event.rsvps.filter(r => r.willAttend).map(r => <Text>{r.user.fullName}</Text>)
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
