'use strict'

import React, {Component} from 'react'
import {ButtonBlack} from './Button'
import Text          from './Text'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'

export default class EventConfirmationView extends Component {
  render() {
    const {props} = this

    return (
      <View style={styles.container}>
        <Text>You are confirmed for {props.event.title}</Text>
        <Text>Make sure you wear clothes</Text>

        <ButtonBlack text="Home" onPress={() => props.navigation.navigate("Membership")} />

        <TouchableOpacity onPress={() => props.rsvp(props.event.id, props.user, false)}>
          <Text style={styles.cancel}>Cancel RSVP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.checkIn(props.event.id, props.user, false)}>
          <Text style={styles.cancel}>Check In</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  cancel: {
    textDecorationLine: 'underline'
  }
})
