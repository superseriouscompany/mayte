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

export default class Website extends Component {
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

  componentDidMount() {
    this.setState({ready: this.testInput(this.props.value)})
  }

  testInput(text) {
    const re = /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/
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
    this.props.update({website: text})
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
              if (this.testInput(props.value)) {
                this.setState({ready: true})
                this.animButton(true)
              } else {
                this.input.focus()
              }
              Animated.timing(this._inputOpacity, {toValue: 1, duration: timing.quizInputOpacity, useNativeDriver: true}).start()
            })
        }}>

        <Animated.Text style={[style.text, style.header]}>WEBSITE</Animated.Text>

        <Input
          outerStyle={[style.inputOuter, {transform: [{scaleX: 1}]}]}
          innerStyle={[style.inputInner, {width: '100%', opacity: 1}]}
          inputStyle={[style.input, ((props.value || '').length > 20 && this.input && this.input.layout ? {
            fontSize: this.input.layout.width / (props.value.length / 1.75)
          } : {})]}
          onFocus={() => this.animButton(false)}
          onBlur={() => this.setState({ready: this.testInput(props.value)})}
          onChangeText={this.handleInput}
          defaultValue={props.value}
          value={state.value}
          ref={el => this.input = el}
          returnKeyType='go'
          onBlur={() => this.setState({ready: this.testInput(props.value)})}
          onSubmitEditing={() => {
            if (this.testInput(props.value)) {
              props.next()
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
  header: {fontSize: em(1.66), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  inputOuter: {marginBottom: em(2)},
  input: {},
})
