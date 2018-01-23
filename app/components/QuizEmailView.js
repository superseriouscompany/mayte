'use strict'

import React, {Component}       from 'react'
import {mayteWhite, mayteBlack} from '../constants/colors'
import {ButtonGrey}             from './Button'
import {Scene, Input}           from './QuizView'
import timing                   from '../constants/timing'
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
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

const buttonHideY = 0

export default class QuizEmailView extends Component {
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
    if (this.state.ready && !prevState.ready) {
      this.animButton(true)
    }
    if (!this.state.ready && prevState.ready) { this.animButton(false) }
  }

  testInput(text) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(text)
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
    this.props.update({email: text})
  }

  render() {
    const {props, state} = this
    const fontBase = em(1.66)
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
              if (this.testInput(props.email)) {
                this.setState({ready: true})
                this.animButton(true)
              }
              Animated.timing(this._inputOpacity, {toValue: 1, duration: timing.quizInputOpacity, useNativeDriver: true}).start()
              this.input.focus()
            })
        }}>

        <Animated.Text style={[style.text, style.header]}>EMAIL ADDRESS</Animated.Text>

        <Input
          outerStyle={[style.inputOuter, {transform: [{scaleX: this._inputContScaleX}]}]}
          innerStyle={[style.inputInner, {width: '100%', opacity: this._inputOpacity}]}
          inputStyle={((props.email || '').length > 20 && this.input && this.input.layout ? {
            fontSize: this.input.layout.width / (props.email.length / 1.75)
          } : {})}
          onChangeText={this.handleInput}
          ref={el => this.input = el}
          defaultValue={props.email}
          value={state.value}
          keyboardType='email-address'
          returnKeyType='go'
          onBlur={() => this.setState({ready: this.testInput(props.email)})}
          onSubmitEditing={() => {
            if (this.testInput(props.email)) {
              this.scene.fadeOut(props.next)
            }
          }}
          autoCapitalize='none'
          autoCorrect={false} />



        <Animated.View style={{opacity: this._buttonOpacity, transform: [{translateY: this._buttonTranslateY}]}}>
          <ButtonGrey
            style={{paddingLeft: em(2), paddingRight: em(2)}}
            onPress={state.ready ? () => this.scene.fadeOut(props.next) : () => null}
            text={props.readyForSubmit ? 'Review & Submit' : 'Next'} />
        </Animated.View>
      </Scene>
    )
  }
}

const style = StyleSheet.create({
  text: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  header: {fontSize: em(1.66), marginBottom: em(4), letterSpacing: em(0.25), fontWeight: '700'},
  inputOuter: {marginBottom: em(2)},
  input: {width: '100%', fontFamily: 'futura', letterSpacing: em(0.5), overflow: 'visible'},
})
