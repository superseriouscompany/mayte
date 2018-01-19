'use strict'

import React, {Component} from 'react'
import {mayteWhite}       from '../constants/colors'
import {ButtonGrey}       from './Button'
import {Scene}            from './QuizView'
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

export default class QuizFreeformView extends Component {
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

  animButton(ready) {
    Animated.parallel([
      Animated.timing(this._buttonOpacity, {
        toValue: ready ? 1 : 0,
        duration: timing.quizButtonIn,
        useNativeDriver: true,
      }),
      Animated.timing(this._buttonTranslateY, {
        toValue: ready ? 0 : 15,
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
    const fontBase = em(2)
    return (
      <Scene
        active={props.step == 'freeform'}
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

        {/* TODO: commit Animated.TextInput to react-native -__- */}
        <Animated.View style={[style.inputCont, {transform: [{scaleX: this._inputContScaleX}]}]}>
          <Animated.View style={[{width: '100%', opacity: this._inputOpacity}]}>
            <TextInput
              value={state.value}
              multiline={true}
              ref={el => this.input = el}
              style={[
                style.text,
                style.input,
                {fontSize: fontBase}
              ]}
              defaultValue={props.freeform}
              placeholderTextColor={mayteWhite(0.66)}
              onChangeText={this.handleInput} />
            </Animated.View>
        </Animated.View>

        <Animated.View style={{opacity: this._buttonOpacity, transform: [{translateY: this._buttonTranslateY}]}}>
          <ButtonGrey
            style={{paddingLeft: em(2), paddingRight: em(2)}}
            onPress={state.ready ? props.next : () => null}
            text='Review' />
        </Animated.View>
      </Scene>
    )
  }
}

const style = StyleSheet.create({
  text: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  header: {fontSize: em(1.33), marginBottom: em(3), letterSpacing: em(0.25), fontWeight: '700'},
  inputCont: {width: '66%', marginBottom: em(2), borderBottomWidth: 1, borderColor: mayteWhite(), paddingBottom: em(0.33),  justifyContent: 'flex-end'},
  input: {width: '100%', fontFamily: 'Futura', letterSpacing: em(0.5), overflow: 'visible'},
})
