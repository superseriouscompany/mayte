'use strict'

import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {Scene} from './QuizView'
import {ButtonGrey} from './Button'
import {mayteWhite} from '../constants/colors'
import {em} from '../constants/dimensions'
import {
  View,
  Text,
  Easing,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class Photos extends Component {
  render() {
    const {props, state} = this
    return (
      <Scene
        style={[style.container]}
        active={props.step == 'photos'}>
        <Text style={[style.text, style.header]}>PHOTOS</Text>
        <Text style={[style.text, style.body]}>
        {`Please submit up to 3 photos of yourself. Upon approval, these photos will be used to populate your profile. (You can always change them later.)`}
        </Text>
        <View style={style.slots}>
        {
          [0,1,2].map(idx => {
            return(
              <View style={style.slot} key={idx}>
                <View style={style.slotBg}><Text style={[style.text, {fontSize: em(2)}]}>+</Text></View>
                { props.photos[idx] ?
                    <Image source={{uri: props.photos[idx]}} resizeMode='cover' /> : null }
              </View>
            )
          })
        }
        </View>

        <ButtonGrey onPress={props.next} text='Next' />
      </Scene>
    )
  }
}

const style = StyleSheet.create({
  container: {paddingRight: em(1), paddingLeft: em(1)},
  text: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  header: {fontSize: em(1.66), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  body: {fontSize: em(1.2), marginBottom: em(3)},
  slots: {flexDirection: 'row', marginBottom: em(2), width: '90%', justifyContent: 'space-between'},
  slot: {width: em(4), height: em(6), borderWidth: 1, borderColor: mayteWhite(), borderRadius: em(0.5)},
  slotBg: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'},
})
