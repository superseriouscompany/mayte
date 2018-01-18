import React, {Component} from 'react'
import {Scene} from './QuizView'
import {ButtonGrey} from './Button'
import {mayteWhite} from '../constants/colors'
import {em} from '../constants/dimensions'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

export default Intro = (props) => {
  return(
    <Scene
      active={props.step == 'intro'}
      style={[style.intro]}>

      <Text style={[style.introText, style.introHeader]}>WELCOME</Text>
      <Text style={[style.introText, style.introBody]}>
      {`Welcome to Unicorn, a premium dating service unlike any other. Your membership provides entry to events, dinners, parties, and more within the Unicorn network. Tap the button below to begin your application — see you on the other side!`}
      </Text>

      <ButtonGrey
        style={{paddingLeft: em(2), paddingRight: em(2)}}
        onPress={props.next}
        text='Begin' />
    </Scene>
  )
}

const style = StyleSheet.create({
  intro: {paddingLeft: em(1), paddingRight: em(1)},
  introText: {backgroundColor: 'transparent', fontFamily: 'Futura', color: mayteWhite(), textAlign: 'center'},
  introHeader: {fontSize: em(2), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  introBody: {fontSize: em(1.2), marginBottom: em(3)},
  introButton: {},
})
