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

export default class Website extends Component {
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
        toValue: ready ? 0 : 15,
        duration: timing.quizButtonIn,
        useNativeDriver: true,
      })
    ]).start()
  }

  handleInput(text) {
    this.props.update({website: text})
    this.setState({ready: this.testInput(text)})
  }

  render() {
    const {props, state} = this
    const fontBase = em(2)
    return (
      <Scene
        active={props.step == 'website'}
        onFadeIn={() => {
            Animated.timing(this._inputContScaleX, {
              toValue: 1,
              duration: timing.quizInputScale,
              easing: Easing.easeIn,
              useNativeDriver: true,
            }).start(() => {
              if (this.testInput(props.website)) {
                this.setState({ready: true})
                this.animButton(true)
              }
              Animated.timing(this._inputOpacity, {toValue: 1, duration: timing.quizInputOpacity, useNativeDriver: true}).start()
              this.input.focus()
            })
        }}>

        <Animated.Text style={[style.text, style.header]}>WEBSITE</Animated.Text>

        {/* TODO: commit Animated.TextInput to react-native -__- */}
        <Animated.View style={[style.inputCont, {transform: [{scaleX: this._inputContScaleX}]}]}>
          <Animated.View style={[{width: '100%', opacity: this._inputOpacity}]}>
            <TextInput
              value={state.value}
              ref={el => this.input = el}
              autoCapitalize={"none"}
              style={[
                style.text,
                style.input,
                ((props.website || '').length > 12 ? {
                  fontSize: fontBase - (1.1 * props.website.length - 12)
                } : {fontSize: fontBase})
              ]}
              defaultValue={props.website}
              placeholderTextColor={mayteWhite(0.66)}
              onChangeText={this.handleInput} />
            </Animated.View>
        </Animated.View>

        <Animated.View style={{opacity: this._buttonOpacity, transform: [{translateY: this._buttonTranslateY}]}}>
          <ButtonGrey
            style={{paddingLeft: em(2), paddingRight: em(2)}}
            onPress={state.ready ? props.next : () => null}
            text={props.readyForSubmit ? 'Review' : 'Next'} />
        </Animated.View>
      </Scene>
    )
  }
}

const style = StyleSheet.create({
  text: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  header: {fontSize: em(1.66), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  inputCont: {width: '66%', marginBottom: em(2), height: em(3), borderBottomWidth: 1, borderColor: mayteWhite(), paddingBottom: em(0.33),  justifyContent: 'flex-end'},
  input: {width: '100%', fontFamily: 'futura', letterSpacing: em(0.5), overflow: 'visible'},
})
