'use strict'

import React, {Component}                           from 'react'
import DatePicker                                   from 'react-native-datepicker'
import {Scene}                                      from './QuizView'
import ImagePicker                                  from 'react-native-image-crop-picker'
import {ButtonGrey}                                 from './Button'
import OrbitLoader                                  from './OrbitLoader'
import {mayteWhite, mayteBlack, mayteRed}           from '../constants/colors'
import {em, screenWidth, screenHeight, notchHeight} from '../constants/dimensions'
import api                                          from '../services/api'
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

const vipOrbitLoaderRadius = em(0.8)
const isGold = false
const testClaim = {referral: {
  fullName: 'Sancho Panza',
  photos: [{url: 'https://pokewalls.files.wordpress.com/2012/06/2ivysaur1920x1200.jpg'}]
}}

export default class Vip extends Component {
  constructor(props) {
    super(props)

    var claimsVipCode = false
    if (props.deeplink && props.deeplink.vipCode) {
      claimsVipCode = props.deeplink.vipCode
    } else if (isGold) {
      claimsVipCode = testClaim
    }

    this._redeemOpacity = new Animated.Value(0)

    this.state = {
      claimsVipCode: '',
      isRedeemingVipCode: false,
      redemptionError: null,
      active: false,
    }

    this.handleVipInput = this.handleVipInput.bind(this)
    this.redeemVipCode = this.redeemVipCode.bind(this)
  }

  componentDidMount() {
    if (this.props.vipCode) {
      Animated.timing(this._redeemOpacity, {toValue: 1, duration: 333, useNativeDriver: true}).start()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.vipCode && !prevProps.vipCode) {
      Animated.timing(this._redeemOpacity, {toValue: 1, duration: 333, useNativeDriver: true}).start()
    }

    if (!this.props.vipCode && prevProps.vipCode) {
      Animated.timing(this._redeemOpacity, {toValue: 0, duration: 333, useNativeDriver: true}).start()
    }
  }

  handleVipInput(vipCode) {
    this.props.update({vipCode})
  }

  redeemVipCode() {
    this.setState({isRedeemingVipCode: true, error: ''})

    // api call
    setTimeout(() => {
      this.props.vipCode.toLowerCase() === 'error' ?
      this.setState({
        isRedeemingVipCode: false,
        error: '**Invalid code'
      }) :
      this.setState({
        isRedeemingVipCode: false,
        claimsVipCode: testClaim
      })
    }, 1000)
  }

  render() {
    const {props, state} = this
    return (
      <View style={[style.section]}>
        {
          !isGold ?
          <View>
          <View style={style.sectionHeader}>
            <Text style={[style.text, style.sectionTitle]}>VIP CODE*</Text>
            <TouchableOpacity
              style={[style.editBtn]}
              onPress={() => this.setState({active: !state.active})}
              hitSlop={{top: -20, bottom: -20, left: -20, right: -20,}}>
              <Image
                style={[
                  style.editIcon,
                ]}
                source={require('../images/edit-white.png')}
                resizeMode='contain' />
            </TouchableOpacity>
          </View>
          { state.active ?
            <View>
              <View style={{flexDirection: 'row'}}>
                <TextInput style={[style.vipInput]} value={props.vipCode} onChangeText={this.handleVipInput} />
                <Animated.View style={{opacity: this._redeemOpacity}}>
                {
                  state.isRedeemingVipCode ?
                  <View style={style.vipLoader}>
                    <OrbitLoader
                      color='white'
                      radius={vipOrbitLoaderRadius}
                      orbRadius={vipOrbitLoaderRadius/4} />
                  </View> :
                  <ButtonGrey
                    style={{transform: [{scale: 0.8}]}}
                    text='Redeem'
                    onPress={this.redeemVipCode} />
                }
                </Animated.View>
              </View>
              <Text style={[style.text, style.vipCaveat]}>*Valid code does not guarantee entry</Text>
              { state.error ?
                  <Text style={[style.text, style.vipError]}>{state.error}</Text> : null }
            </View> : null
          }
          </View> : null
        }

        {
          state.claimsVipCode ?
          <View style={style.ref}>
            <Text style={[style.text, style.refHeader]}>REFERRED BY:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={style.refBubble} source={{url: state.claimsVipCode.referral.photos[0].url}} />
              <Text style={[style.text, style.refName]}>{state.claimsVipCode.referral.fullName}</Text>
            </View>
          </View>
          : null
        }
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {paddingRight: em(1), paddingLeft: em(1)},
  text: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  header: {fontSize: em(2), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  sectionHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: em(0.66),},
  sectionTitle: {fontSize: em(1.33), textAlign: 'left', fontWeight: '700', letterSpacing: em(0.133)},
  editBtn: {width: em(2), height: em(2), marginLeft: em(0.66)},
  editIcon: {width: '100%', height: '100%',},
  valueText: {fontFamily: 'Gotham-Book', textAlign: 'left', fontSize: em(1.33)},
  body: {fontSize: em(1.2), marginBottom: em(3)},
  section: {width: '100%', marginBottom: em(2)},
  vipInput: {borderBottomWidth: 2, borderColor: mayteWhite(), width: '66%', paddingBottom: em(0.5), fontSize: em(2), fontFamily: 'Gotham-Medium', color: mayteWhite(), marginRight: em(0.66)},
  vipCaveat: {fontSize: em(0.9), fontFamily: 'Gotham-Book', marginTop: em(0.66), textAlign: 'left'},
  vipError: {fontSize: em(0.9), fontFamily: 'Gotham-Book', marginTop: em(0.33), textAlign: 'left', color: mayteRed()},
  vipLoader: {position: 'absolute', left: em(1), top: em(0.66), transform: [{translateX: -(vipOrbitLoaderRadius / 2)}]},
  ref: {alignItems: 'center', marginTop: em(2), marginBottom: em(1)},
  refHeader: {fontSize: em(1.33), textAlign: 'center', fontWeight: '700', marginBottom: em(2), letterSpacing: em(0.133)},
  refBubble: {width: em(6), height: em(6), borderRadius: em(3), marginRight: em(1)},
  refName: {fontSize: em(2)},
})
