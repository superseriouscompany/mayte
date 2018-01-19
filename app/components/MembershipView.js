'use strict'

import React, {Component} from 'react'
import moment             from 'moment'
import Text               from './Text'
import QRCode             from 'react-native-qrcode'
import MembershipDeckView from './MembershipDeckView'
import MembershipInfoView from './MembershipInfoView'
import {baseUrl}          from '../services/api'
import {mayteBlack}       from '../constants/colors'
import {ButtonBlack}      from './Button'
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
    this.state = {
      open: false,
      mask: false,
    }

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
    Animated.spring(this._maskOp, {
      toValue: 1,
      stiffness: 200,
      overshootClamping: true,
      useNativeDriver: true,
    }).start()
  }

  fadeOutMask() {
    Animated.spring(this._maskOp, {
      toValue: 0,
      stiffness: 200,
      overshootClamping: true,
      useNativeDriver: true,
    }).start(() => {
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
        { state.mask ?
            <Animated.View
              style={[
                style.mask,
                {opacity: this._maskOp}
              ]} /> : null }

        <ButtonBlack text='Membership' onPress={() => this.info.animateOpen()} />
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },



  mask: {
    position: 'absolute',
    top: 0, left: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: mayteBlack(0.9),
  },
})
