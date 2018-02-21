'use strict'

import React, {Component} from 'react'
import Text from './Text'
import {ButtonGrey} from './Button'
import {mayteBlack, mayteWhite} from '../constants/colors'
import {em} from '../constants/dimensions'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
} from 'react-native'

export default class EventFeedbackView extends Component {
  render() {
    const {props} = this

    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.header]}>We Hope You Had Fun</Text>
        <Text style={[styles.text, styles.subheader]}>{props.event.title}</Text>

        <Text style={[styles.text, styles.prompt]}>Please select one guest whom you would like to see again:</Text>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.guests}>
        {
          props.event.rsvp.yes.map((u,i) =>
            <TouchableOpacity
              key={i}
              style={[styles.guest, {backgroundColor: props.selected && u.id === props.selected.id ? 'pink' : 'transparent'}]}
              onPress={() => this.props.select(u)}>
              <Image style={styles.bubble} source={{uri: u.photos[0].url}} />
              <Text style={[styles.text, styles.name]}>{u.fullName}</Text>
            </TouchableOpacity>
          )
        }
        </ScrollView>
        <View style={[styles.confirm, !props.selected ? {opacity: 0} : {}]}>
          <ButtonGrey text="Confirm" onPress={() => props.selected ? props.confirm() : null} />
          <View style={[styles.confirmUser]}>
            <Image style={styles.confirmUserBubble} source={{uri: props.selected ? props.selected.photos[0].url : 'http.cat/200.jpg'}} />
            <Text style={[styles.text]}>{props.selected ? props.selected.fullName : 'Bloobs'}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: mayteBlack(), alignItems: 'center'},
  text: {textAlign: 'center', color: mayteWhite()},
  header: {marginTop: em(1), fontSize: em(2),},
  subheader: {fontSize: em(1), marginBottom: em(1)},
  prompt: {marginBottom: em(1)},
  guests: {flexDirection: 'row', flexWrap: 'wrap', width: '100%'},
  guest: {width: '50%', alignItems: 'center', justifyContent: 'flex-start', marginBottom: em(1)},
  bubble: {width: em(4), height: em(4), borderRadius: em(2), marginBottom: em(0.66)},
  name: {fontSize: em(1)},
  confirm: {paddingVertical: em(1), alignItems: 'center'},
  confirmUser: {paddingVertical: em(1), flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
  confirmUserBubble: {height: em(3), width: em(3), borderRadius: em(1.5), marginLeft: em(1)},
})
