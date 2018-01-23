'use strict'

import React, {Component} from 'react'
import {mayteWhite}       from '../constants/colors'
import {ButtonGrey}       from './Button'
import {Scene, Input}     from './QuizView'
import timing             from '../constants/timing'
import {
  em,
  screenWidth,
  tabNavHeight,
  screenHeight,
  bottomBoost
} from '../constants/dimensions'
import {
  View,
  Text,
  Easing,
  Animated,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

const buttonHideY = 0

export default class QuizFreeformView extends Component {
  constructor(props) {
    super(props)
    this._inputContScaleX = new Animated.Value(0)
    this._inputOpacity = new Animated.Value(0)
    this._buttonOpacity = new Animated.Value(0)
    this._buttonTranslateY = new Animated.Value(buttonHideY)
    this.state = {ready: false}

    this.animButton = this.animButton.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.ready && !prevState.ready) { this.animButton(true) }
    if (!this.state.ready && prevState.ready) { this.animButton(false) }
  }

  animButton(ready) {
    Animated.parallel([
      Animated.timing(this._buttonOpacity, {
        toValue: ready ? 1 : 0,
        duration: timing.quizButtonIn,
        useNativeDriver: true,
      }),
      Animated.timing(this._buttonTranslateY, {
        toValue: ready ? 0 : buttonHideY,
        duration: timing.quizButtonIn,
        useNativeDriver: true,
      })
    ]).start()
  }

  handleInput(text) {
    this.props.update({freeform: text})
    this.setState({ready: !!text})
  }

  render() {
    const {props, state} = this
    const fontBase = em(1)
    return (
      <Scene
        ref={el => this.scene = el}
        onFadeIn={() => {
            Animated.timing(this._inputContScaleX, {
              toValue: 1,
              duration: timing.quizInputScale,
              easing: Easing.easeIn,
              useNativeDriver: true,
            }).start(() => {
              if (props.freeform) {
                this.setState({ready: true})
                this.animButton(true)
              }
              Animated.timing(this._inputOpacity, {toValue: 1, duration: timing.quizInputOpacity, useNativeDriver: true}).start()
              this.input.focus()
            })
        }}>

        <Animated.Text style={[style.text, style.header]}>DO YOU BELIEVE IN MAGIC?</Animated.Text>

        <Input
          outerStyle={[style.inputOuter, {width: '80%', borderWidth: 1, minHeight: fontBase * 8, paddingLeft: em(0.66), paddingRight: em(0.66), borderColor: mayteWhite(0.1)}, {transform: [{scaleX: this._inputContScaleX}]}]}
          innerStyle={[style.inputInner, {width: '100%', opacity: this._inputOpacity}]}
          inputStyle={[{fontSize: fontBase, textAlign: 'left'}]}
          onChangeText={this.handleInput}
          ref={el => this.input = el}
          defaultValue={props.freeform}
          multiline={true}
          blurOnSubmit={true}
          value={state.value} />

        <Animated.View style={{opacity: this._buttonOpacity, transform: [{translateY: this._buttonTranslateY}]}}>
          <ButtonGrey
            style={{paddingLeft: em(1.33), paddingRight: em(1.33)}}
            onPress={state.ready ? () => this.scene.fadeOut(props.next) : () => null}
            text='Review & Submit' />
        </Animated.View>
      </Scene>
    )
  }
}

const style = StyleSheet.create({
  text: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  header: {fontSize: em(1.33), marginBottom: em(3), letterSpacing: em(0.25), fontWeight: '700'},
  inputOuter: {marginBottom: em(2), paddingLeft: em(0.66), paddingRight: em(0.66)},
})
