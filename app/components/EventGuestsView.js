'use strict'

import React, {Component} from 'react'
import {em} from '../constants/dimensions'
import {mayteBlack, mayteWhite} from '../constants/colors'
import Text from './Text'
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
} from 'react-native'

export default class EventGuests extends Component {
  render() {
    const {props} = this

    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.text, styles.header]}>Guest List</Text>
        <Text style={[styles.text, styles.subheader]}>{props.event.title}</Text>
        <View style={styles.guests}>
        {
          props.event.rsvp.yes.map((u,i) =>
            <View style={styles.guest} key={i}>
              <Image style={styles.bubble} source={{uri: u.photos[0].url}} />
              <Text style={[styles.text, styles.name]}>{u.fullName}</Text>
            </View>
          )
        }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: mayteBlack()},
  text: {textAlign: 'center', color: mayteWhite()},
  header: {marginTop: em(1), fontSize: em(2),},
  subheader: {fontSize: em(1), marginBottom: em(1)},
  guests: {flexDirection: 'row', flexWrap: 'wrap', width: '100%'},
  guest: {width: '50%', alignItems: 'center', justifyContent: 'flex-start', marginBottom: em(1)},
  bubble: {width: em(4), height: em(4), borderRadius: em(2), marginBottom: em(0.66)},
  name: {fontSize: em(1)},
})
