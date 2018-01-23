'use strict'

import React, {Component}       from 'react'
import DatePicker               from 'react-native-datepicker'
import moment                   from 'moment'
import {Scene}                  from './QuizView'
import {ButtonGrey}             from './Button'
import {mayteWhite, mayteBlack} from '../constants/colors'
import {em}                     from '../constants/dimensions'
import timing                   from '../constants/timing'
import {
  View,
  Text,
  Easing,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

const buttonHideY = 0
const oldest   = moment().subtract(100, 'years')
const youngest = moment().subtract(18, 'years')

export default class QuizDobView extends Component {
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

  handleInput(dob) {
    this.props.update({dob})
    this.setState({ready: !!dob})
  }

  render() {
    const {props, state} = this
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
              if (!!props.dob) {
                this.setState({ready: true})
                this.animButton(true)
              }
              Animated.timing(this._inputOpacity, {toValue: 1, duration: timing.quizInputOpacity, useNativeDriver: true}).start()
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
                  fontFamily: 'Futura',
                  fontSize: em(1.33),
                  color: mayteWhite(),
                },
                placeholderText: {
                  fontFamily: 'Futura',
                  fontSize: em(1.33),
                }
              }}
              date={props.dob}
              mode="date"
              placeholder="Select Date"
              format="MMM Do YYYY"
              showIcon={false}
              minDate={oldest.format('MMM Do YYYY')}
              maxDate={youngest.format('MMM Do YYYY')}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={this.handleInput} />
            </Animated.View>
        </Animated.View>

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
  pickerCont: {width: 200, marginBottom: em(2), borderBottomWidth: 1, borderColor: mayteWhite(), paddingBottom: em(0.33),  justifyContent: 'flex-end', width: '66%', backgroundColor: mayteBlack(0.2), borderBottomWidth: 1, borderColor: mayteWhite(), borderRadius: 4, paddingBottom: em(0.33), paddingTop: em(0.33),},
  picker: {width: '100%'},
})
