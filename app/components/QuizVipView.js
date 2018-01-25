'use strict'

import React, {Component} from 'react'
import {mayteWhite}       from '../constants/colors'
import {ButtonGrey}       from './Button'
import {Scene, Input}     from './QuizView'
import OrbitLoader        from './OrbitLoader'
import timing             from '../constants/timing'
import log                from '../services/log'
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
  Image,
  Easing,
  Animated,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native'

const buttonHideY = 0
const vipOrbitLoaderRadius = em(1.33)

export default class Vip extends Component {
  constructor(props) {
    super(props)
    this._inputContScaleX = new Animated.Value(0)
    this._inputOpacity = new Animated.Value(0)
    this._buttonOpacity = new Animated.Value(0)
    this._buttonTranslateY = new Animated.Value(buttonHideY)
    this.state = {ready: false}
    this.verify = this.verify.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(vipCode) {
    this.props.update({vipCode})
  }

  verify() {
    return this.props.redeemVipCode(this.props.quiz.vipCode).then(referer => {
      this.props.update({referer})
    }).catch(err => {
      log(err)
      alert(err.message || JSON.stringify(err))
    })
  }

  render() {
    const {props, state} = this
    const fontBase = em(1.66)
    return (
      <Scene
        contStyle={style.container}
        ref={el => this.scene = el}
        onFadeIn={() => {
            Animated.timing(this._inputContScaleX, {
              toValue: 1,
              duration: timing.quizInputScale,
              easing: Easing.easeIn,
              useNativeDriver: true,
            }).start()
        }}>

        <KeyboardAvoidingView style={style.keyCnr} keyboardVerticalOffset={-screenHeight * 0.33} behavior="position" contentContainerStyle={style.keyCnr}>
          <Animated.Text style={[style.text, style.header]}>VIP CODE</Animated.Text>

          <Input
            outerStyle={[style.inputOuter, {transform: [{scaleX: 1}]}]}
            innerStyle={[style.inputInner, {width: '100%', opacity: 1}]}
            inputStyle={[style.input, ((props.value || '').length > 20 && this.input && this.input.layout ? {
              fontSize: this.input.layout.width / (props.value.length / 1.75)
            } : {})]}
            onChangeText={this.handleInput}
            defaultValue={props.value}
            value={state.value}
            ref={el => this.input = el}
            autoCapitalize='none'
            autoCorrect={false} />

            { !props.quiz.referer ? null :
              <View style={style.ref}>
                <Text style={[style.text, style.refHeader]}>REFERRED BY:</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image style={style.refBubble} source={{url: props.quiz.referer.imageUrl}} />
                  <Text style={[style.text, style.refName]}>{props.quiz.referer.fullName}</Text>
                </View>
              </View>
            }

          <Animated.View style={[style.redeemCont, {opacity: this._buttonOpacity, opacity: 1}]}>
          {
            props.redeeming ?
              <OrbitLoader
                color='white'
                radius={vipOrbitLoaderRadius}
                orbRadius={vipOrbitLoaderRadius/4} /> :
              <ButtonGrey
                style={{paddingLeft: em(2), paddingRight: em(2)}}
                onPress={props.quiz.referer ? () => this.scene.fadeOut(props.next) : this.verify}
                text={props.quiz.referer ? props.readyForSubmit ? 'Review & Submit' : 'Next' : 'Redeem'} />
          }
          </Animated.View>

          { props.readyForSubmit ? null : props.quiz.referer ? null :
            <Animated.View style={style.skip}>
              <ButtonGrey
                style={style.skipBtn}
                styleText={{fontSize: em(0.8)}}
                onPress={() => this.scene.fadeOut(props.next)}
                text={'Skip'} />
            </Animated.View> }
        </KeyboardAvoidingView>
      </Scene>
    )
  }
}

const style = StyleSheet.create({
  container: {height: screenHeight, width: screenWidth},
  keyCnr: { width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center',},
  text: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  header: {fontSize: em(1.66), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  inputOuter: {marginBottom: em(2),},
  redeemCont: {width: '100%', justifyContent: 'center', alignItems: 'center'},
  skip: {position: 'absolute', bottom: em(2.66), width: '100%', alignItems: 'center'},
  skipBtn: {paddingLeft: em(1.33), paddingRight: em(1.33), paddingTop: em(0.4), paddingBottom: em(0.4)},
  ref: {alignItems: 'center', marginTop: em(2), marginBottom: em(4)},
  refHeader: {fontSize: em(1.33), textAlign: 'center', fontWeight: '700', marginBottom: em(2), letterSpacing: em(0.133)},
  refBubble: {width: em(6), height: em(6), borderRadius: em(3), marginRight: em(1)},
  refName: {fontSize: em(2)},
})
