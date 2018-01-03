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

export default class ButtonBlack extends Component {
  render() {
    const {props,state} = this
    return(
      <TouchableOpacity style={[base.button, props.style]}
                        onPress={props.onPress}>
        <LinearGradient colors={[mayteBlack(0.85), mayteBlack()]} style={base.buttonGrad} />
        <Text style={[base.buttonText]}>{props.text}</Text>
      </TouchableOpacity>
    )
  }
}
