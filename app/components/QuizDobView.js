'use strict'

import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {Scene} from './QuizView'
import {ButtonGrey} from './Button'
import {mayteWhite} from '../constants/colors'
import {em} from '../constants/dimensions'
import {
  View,
  Text,
  Easing,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class Dob extends Component {
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

  handleInput(date) {
    this.props.updateDob(date)
    this.setState({ready: !!date})
  }

  render() {
    const {props, state} = this
    return (
      <Scene
        active={props.step == 'dob'}
        onFadeIn={() => {
            Animated.timing(this._inputContScaleX, {
              toValue: 1,
              duration: 666,
              easing: Easing.easeIn,
              useNativeDriver: true,
            }).start(() => {
              this.animButton(!!props.dob)
              Animated.timing(this._inputOpacity, {toValue: 1, duration: 333, useNativeDriver: true}).start()
            })
        }}>

        <Animated.Text style={[style.text, style.header]}>DATE OF BIRTH</Animated.Text>

        <Animated.View style={[style.pickerCont, {transform: [{scaleX: this._inputContScaleX}]}]}>
          <Animated.View style={[{width: '100%', opacity: this._inputOpacity}]}>
            <DatePicker
              style={[style.picker, {borderRadius: em(0.33)}]}
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  borderRadius: em(0.33),
                },
                dateText: {
                  fontFamily: 'Gotham-Book',
                  fontSize: em(1.33),
                  color: mayteWhite(),
                },
                placeholderText: {
                  fontFamily: 'Gotham-Book',
                  fontSize: em(1.33),
                }
              }}
              date={props.dob}
              mode="date"
              placeholder="Select Date"
              format="MMM Do YYYY"
              showIcon={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={this.handleInput} />
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
  text: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  header: {fontSize: em(1.66), marginBottom: em(4), letterSpacing: em(0.25), fontWeight: '700'},
  pickerCont: {width: 200, marginBottom: em(2), borderBottomWidth: 1, borderColor: mayteWhite(), paddingBottom: em(0.33),  justifyContent: 'flex-end'},
  picker: {width: '100%'},
})
