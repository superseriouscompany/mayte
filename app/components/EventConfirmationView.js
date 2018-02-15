'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class EventConfirmationView extends Component {
  render() {
    const {props} = this

    return (
      <View style={styles.container}>
        <Text>You are confirmed for {props.event.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
