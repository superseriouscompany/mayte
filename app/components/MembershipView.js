'use strict'

import React, {Component}          from 'react'
import moment                      from 'moment'
import Text                        from './Text'
import QRCode                      from 'react-native-qrcode'
import MembershipDeckView, {Slide} from './MembershipDeckView'
import MembershipInfoView          from './MembershipInfoView'
import {baseUrl}                   from '../services/api'
import {mayteBlack}                from '../constants/colors'
import {ButtonBlack, ButtonGrey}   from './Button'
import {
  screenWidth,
  screenHeight,
  em,
  notchHeight
} from '../constants/dimensions'
import {
  ActivityIndicator,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

export default class MembershipView extends Component {
  constructor(props) {
    super(props)

    this._maskOp = new Animated.Value(0)
    this._hideOp = new Animated.Value(1)
    this.state = {
      open: false,
      mask: false,
    }

    this.goldSlide =
      <Slide styleBg={{opacity: 0.66}} style={style.goldSlide} bg={require('../images/fractal-bg-gold.png')}>
        <Text style={[style.slideText, style.slideBody]}>{`You are a founding member of Unicorn - congratulations! Please enjoy VIP treatment and the ability to invite users onto our platform.`}</Text>
        <ButtonGrey
          onPress={() => props.navigate('VipCodeInvite')}
          style={[style.goldSlideBtn]}
          styleText={style.goldSlideBtnText}
          text='Learn More' />
      </Slide>

    this.linkToInstagram = this.linkToInstagram.bind(this)
    this.incrementMask = this.incrementMask.bind(this)
    this.fadeInMask = this.fadeInMask.bind(this)
    this.fadeOutMask = this.fadeOutMask.bind(this)
  }

  incrementMask(to) {
    Animated.timing(this._maskOp, {
      toValue: to,
      duration: 0,
      useNativeDriver: true,
    }).start()
  }

  fadeInMask() {
    Animated.parallel([
      Animated.spring(this._hideOp, {
        toValue: 0,
        stiffness: 200,
        overshootClamping: true,
        useNativeDriver: true,
      }),
      Animated.spring(this._maskOp, {
        toValue: 1,
        stiffness: 200,
        overshootClamping: true,
        useNativeDriver: true,
      })
    ]).start()
  }

  fadeOutMask() {
    Animated.parallel([
      Animated.spring(this._hideOp, {
        toValue: 1,
        stiffness: 200,
        overshootClamping: true,
        useNativeDriver: true,
      }),
      Animated.spring(this._maskOp, {
        toValue: 0,
        stiffness: 200,
        overshootClamping: true,
        useNativeDriver: true,
      })
    ]).start(() => {
      this.setState({mask: false})
    })
  }

  linkToInstagram(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        log(`can't handle url: ${url}`)
      } else {
        Linking.openURL(url)
      }
    })
  }

  render() {
    const {props, state} = this
    return (
      <View style={style.container}>
        <MembershipDeckView
          hideOpacity={this._hideOp}
          user={props.user}
          slides={[...(true ? [this.goldSlide] : []), ...slides]} />

        { state.mask ?
            <Animated.View
              style={[
                style.mask,
                {opacity: this._maskOp}
              ]} /> : null }

        <Animated.View style={{opacity: this._hideOp}}>
          <ButtonBlack
            style={style.button}
            text='View Membership'
            onPress={() => this.info.animateOpen()} />
        </Animated.View>
        <MembershipInfoView
          ref={i => this.info = i}
          {...props} {...state}
          style={[style.infoCont]}
          incrementMask={this.incrementMask}
          fadeInMask={this.fadeInMask}
          fadeOutMask={this.fadeOutMask}
          maskOn={() => this.setState({mask: true})}
          maskOff={() => this.setState({mask: false})}
          linkToInstagram={this.linkToInstagram}
          setOpen={(boo) => this.setState({
            open: boo,
         })} />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-end', alignItems: 'center',},
  mask: {position: 'absolute', top: 0, left: 0, width: screenWidth, height: screenHeight, backgroundColor: mayteBlack(0.9),},
  button: {marginBottom: em(3), paddingLeft: em(1.66), paddingRight: em(1.66),},
  slideText: {color: mayteBlack(), textAlign: 'center', backgroundColor: 'transparent'},
  slideTitle: {fontFamily: 'Futura', fontWeight: '700', fontSize: em(2.33), letterSpacing: em(0.1), marginBottom: em(2)},
  slideBody: {fontFamily: 'Gotham-Book', fontSize: em(1.2), lineHeight: em(1.6)},
  goldSlide: {alignItems: 'center', justifyContent: 'center'},
  goldSlideBtn: {flex: 0, marginTop: em(2), paddingLeft: em(1.66), paddingRight: em(1.66),},
  goldSlideBtnText: {fontSize: em(0.8)},
})

const slides = [
  <Slide styleBg={{opacity: 0.66}} bg={require('../images/fractal-bg-rainbow.png')}>
    <Text style={[style.slideText, style.slideTitle]}>{`YOU’RE VIP`}</Text>
    <Text style={[style.slideText, style.slideBody]}>{`Your membership includes full access to all social events, premium dating services and world-class concierge service.`}</Text>
  </Slide>,
  <Slide styleBg={{opacity: 0.66}} bg={require('../images/fractal-bg-pink.png')}>
    <Text style={[style.slideText, style.slideTitle]}>{`FIRST CLASS`}</Text>
    <Text style={[style.slideText, style.slideBody]}>{`Regular events include exclusive parties, concerts, dinners and more – all inclusive with your Unicorn membership.`}</Text>
  </Slide>,
  <Slide styleBg={{opacity: 0.66}} bg={require('../images/fractal-bg-blue.png')}>
    <Text style={[style.slideText, style.slideTitle]}>{`MAGIC`}</Text>
    <Text style={[style.slideText, style.slideBody]}>{`Unicorn memberships come with personal concierge getting you instant reservations to the hottest restaurants and clubs.`}</Text>
  </Slide>,
]
