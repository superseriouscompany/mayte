import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import base from './styles'
import {em} from './dimensions'
import {mayteBlack, mayteWhite} from './colors'
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
        <LinearGradient colors={[mayteBlack(0.85), mayteBlack()]} style={base.buttonGrad} />
        <Text style={[base.buttonText]}>{props.text}</Text>
      </TouchableOpacity>
    )
  }
}
