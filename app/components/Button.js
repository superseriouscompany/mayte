import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import base from '../constants/styles'
import {em} from '../constants/dimensions'
import {mayteBlack, mayteWhite} from '../constants/colors'
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

export class ButtonBlack extends Component {
  render() {
    const {props,state} = this
    return(
      <TouchableOpacity style={[base.button, props.style]}
                        onPress={props.onPress}>
        <LinearGradient colors={['rgb(68,64,65)', mayteBlack()]} style={[base.buttonGrad, props.styleGrad]} />
        <Text style={[base.buttonText, props.styleText]}>{props.text}</Text>
      </TouchableOpacity>
    )
  }
}

// TODO: refactor into single component that accepts theme prop
export class ButtonGrey extends Component {
  render() {
    const {props,state} = this
    return(
      <TouchableOpacity style={[base.button, props.style]}
                        onPress={props.onPress}>
        <LinearGradient colors={[mayteWhite(), 'rgb(225,221,222)']} style={[base.buttonGrad, props.styleGrad]} />
        <Text style={[base.buttonText, props.styleText, {color: mayteBlack()}]}>{props.text}</Text>
      </TouchableOpacity>
    )
  }
}
