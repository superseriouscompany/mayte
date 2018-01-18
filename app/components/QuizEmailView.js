'use strict'

import React, {Component}                                         from 'react'
import {em, screenWidth, tabNavHeight, screenHeight, bottomBoost} from '../constants/dimensions'
import {mayteWhite}                                               from '../constants/colors'
import {ButtonGrey}                                               from './Button'
import {Scene}                                                    from './QuizView'
import {
  View,
  Text,
  Easing,
  Animated,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class Email extends Component {
  constructor(props) {
    super(props)
    this._inputContScaleX = new Animated.Value(0)
    this._inputOpacity = new Animated.Value(0)
    this._buttonOpacity = new Animated.Value(0)
    this._buttonTranslateY = new Animated.Value(15)
    this.state = {ready: false}

    this.animButton = this.animButton.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.ready && !prevState.ready) { this.animButton(true) }
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
        duration: 333,
        useNativeDriver: true,
      }),
      Animated.timing(this._buttonTranslateY, {
        toValue: ready ? 0 : 15,
        duration: 333,
        useNativeDriver: true,
      })
    ]).start()
  }

  handleInput(text) {
    this.props.update({email: text})
    this.setState({ready: this.testInput(text)})
  }

  render() {
    const {props, state} = this
    const fontBase = em(2)
    return (
      <Scene
        active={props.step == 'email'}
        onFadeIn={() => {
            Animated.timing(this._inputContScaleX, {
              toValue: 1,
              duration: 666,
              easing: Easing.easeIn,
              useNativeDriver: true,
            }).start(() => {
              this.animButton(this.testInput(props.email))
              Animated.timing(this._inputOpacity, {toValue: 1, duration: 333, useNativeDriver: true}).start()
              this.input.focus()
            })
        }}>

        <Animated.Text style={[style.emailText, style.emailHeader]}>EMAIL ADDRESS</Animated.Text>

        {/* TODO: commit Animated.TextInput to react-native -__- */}
        <Animated.View style={[style.emailInputCont, {transform: [{scaleX: this._inputContScaleX}]}]}>
          <Animated.View style={[{width: '100%', opacity: this._inputOpacity}]}>
            <TextInput
              value={state.value}
              ref={el => this.input = el}
              keyboardType='email-address'
              autoCapitalize={"none"}
              style={[
                style.emailText,
                style.emailInput,
                ((props.email || '').length > 12 ? {
                  fontSize: fontBase - (1.1 * props.email.length - 12)
                } : {fontSize: fontBase})
              ]}
              defaultValue={props.email}
              placeholderTextColor={mayteWhite(0.66)}
              onChangeText={this.handleInput} />
            </Animated.View>
        </Animated.View>

        <Animated.View style={{opacity: this._buttonOpacity, transform: [{translateY: this._buttonTranslateY}]}}>
          <ButtonGrey
            style={{paddingLeft: em(2), paddingRight: em(2)}}
            onPress={props.next}
            text='Next' />
        </Animated.View>
      </Scene>
    )
  }
}

const style = StyleSheet.create({
  email: {},
  emailText: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  emailHeader: {fontSize: em(1.66), marginBottom: em(4), letterSpacing: em(0.25), fontWeight: '700'},
  emailInputCont: {width: '66%', marginBottom: em(2), height: em(3), borderBottomWidth: 1, borderColor: mayteWhite(), paddingBottom: em(0.33),  justifyContent: 'flex-end'},
  emailInput: {width: '100%', fontFamily: 'futura', letterSpacing: em(0.5), overflow: 'visible'},
  emailButton: {},
})
