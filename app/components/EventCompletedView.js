'use strict'

import React, {Component} from 'react'
import Text from './Text'
import {ButtonBlack} from './Button'
import {
  StyleSheet,
  View,
} from 'react-native'

export default class EventCompletedView extends Component {
  render() {
    const {props} = this

    return (
      <View style={styles.container}>
        <Text>Thank you for your feedback.</Text>
        <ButtonBlack text="Home" onPress={() => props.navigation.navigate('Membership')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
})
