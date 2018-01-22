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

      <Text style={[style.text, style.header]}>WELCOME</Text>
      <Text style={[style.text, style.body]}>
      {`Welcome to Unicorn, a premium dating service. Your membership provides entry to events, dinners, parties, and more within the Unicorn network.`}
      </Text>

      <ButtonGrey
        style={{paddingLeft: em(2.66), paddingRight: em(2.66), paddingTop: em(0.66), paddingBottom: em(0.66)}}
        onPress={props.next}
        text='Apply' />
    </Scene>
  )
}

const style = StyleSheet.create({
  intro: {paddingLeft: em(1), paddingRight: em(1)},
  text: {backgroundColor: 'transparent', fontFamily: 'Futura', color: mayteWhite(), textAlign: 'center'},
  header: {fontSize: em(2), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  body: {fontSize: em(1.1), marginBottom: em(3),},
})
