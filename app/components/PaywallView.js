'use strict'

import React, {Component} from 'react'
import Text from './Text'
import base from '../constants/styles'
import Firework from './Firework'
import {
  em,
  screenWidth,
  screenHeight,
  notchHeight,
  bottomBoost
} from '../constants/dimensions'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Animated,
  Easing,
} from 'react-native'

const calculateFireworkOffset = (top, left) => {
  return {
    top: (screenHeight/2-fireworkDiameter/2) + top,
    left: (screenWidth/2-fireworkDiameter/2) + left,
  }
}
const fireworkDiameter = screenWidth * 0.6
const sparkDiameter = em(1)

export default class PaywallView extends Component {
  constructor(props) {
    super(props)
    this._balloonerY  = new Animated.Value(screenHeight)
    this._balloonerX  = new Animated.Value(-screenWidth * 0.9)
    this._bgOpacity   = new Animated.Value(0)
    this._contOpacity = new Animated.Value(1)

    this.numFetti = 3
    this.exit = this.exit.bind(this)
  }

  componentDidMount() {
    Animated.sequence([
      Animated.delay(800),
      Animated.parallel([
        Animated.spring(this._balloonerY, {
          toValue: 0,
          damping: 20,
          useNativeDriver: true,
        }),
        Animated.spring(this._balloonerX, {
          toValue: 0,
          damping: 20,
          useNativeDriver: true,
        })
      ]),
      Animated.delay(1800),
      Animated.parallel([
        Animated.spring(this._balloonerY, {
          toValue: -screenHeight / 2,
          damping: 180,
          useNativeDriver: true,
        }),
        Animated.spring(this._balloonerX, {
          toValue: screenWidth * 0.9 / 2,
          damping: 180,
          useNativeDriver: true,
        })
      ]),
      Animated.timing(this._bgOpacity, {
        toValue: 0.5,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start()
  }

  exit(cb) {
    Animated.sequence([
      Animated.timing(this._contOpacity, {
        toValue: 0,
        duration: 333,
        useNativeDriver: true,
      }),
      Animated.delay(333),
      Animated.timing(this._bgOpacity, {
        toValue: 0,
        duration: 333,
        useNativeDriver: true,
      }),
    ]).start(cb)
  }

  render() {
    const {props,state} = this
    const product = (props.products || [])[0]

    return (
      <View style={style.container}>
        <Animated.Image style={[style.bg, {opacity: this._bgOpacity}]} resizeMode='cover' source={require('../images/PaywallBG.jpg')} />
        { product ?
          <Animated.View style={[style.container, {alignItems: 'center', opacity: this._contOpacity}]}>
            <Animated.View style={[
                             style.ballooner,
                             {transform: [{translateX: this._balloonerX}, {translateY: this._balloonerY}]},
                           ]}>
              <Image source={require('../images/balloons-black.png')} resizeMode='contain'
                     style={style.balloons} />
              <Image source={ // no conditional strings in require :[
                       props.gender == 'male' ? require('../images/unicorn-male-black.png') :
                       props.gender == 'female' ? require('../images/unicorn-female-black.png') :
                       require('../images/unicorn-all-black.png')
                     }
                     resizeMode='contain'
                     style={style.unicorn} />
            </Animated.View>

            <Firework color='#D42456' delay={0} style={[calculateFireworkOffset(-em(2),-em(2))]} fireworkDiameter={fireworkDiameter} sparkDiameter={em(0.6)} numSparks={16} />
            <Firework color='#2755A8' delay={1000} style={[calculateFireworkOffset(em(1),0)]} fireworkDiameter={fireworkDiameter} sparkDiameter={em(0.8)} numSparks={10} />
            <Firework color='#FFCC00' delay={2000} style={[calculateFireworkOffset(-em(1),em(2))]} fireworkDiameter={fireworkDiameter} sparkDiameter={em(0.6)} numSparks={16} />

            <Text style={[style.teaser, base.text]}>
              There are only 100 spots available for our first members only party in LA.
            </Text>

            <View style={style.payBtnCont}>
              <TouchableOpacity style={[base.button, style.mainButton]} onPress={() => props.buy(product.identifier)}>
                <Text style={[base.buttonText, style.payBtn]}>Join for {product.priceString}/month</Text>
              </TouchableOpacity>
              <Text style={[base.text]}>{`Payment starts Valentine's Day.`}</Text>
            </View>

            <TouchableOpacity style={[style.backdoor]} onPress={() => this.exit(props.visitVipWall)}>
              <Text style={[{backgroundColor:'transparent'}, base.text]}>I have a VIP Code</Text>
            </TouchableOpacity>
          </Animated.View>
          :
          <View style={style.loadingCnr}>
            <ActivityIndicator size="large" />
          </View>
        }
      </View>
    )

  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  teaser: {
    padding: em(1.66),
    fontSize: em(2),
    backgroundColor: 'transparent',
    marginTop: notchHeight/2,
  },
  loadingCnr: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
  payBtnCont: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: screenWidth * 0.2,
  },
  payBtnText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  mainButton: {
    marginBottom: em(1),
  },
  backdoor: {
    marginBottom: em(1) + bottomBoost
  },
  ballooner: {
    position: 'absolute',
    width: screenWidth * 0.4,
    overflow: 'visible',
    top: screenHeight*0.25,
    right: em(1),
  },
  balloons: {
    width: '100%',
    height: em(9),
  },
  unicorn: {
    width: '80%',
    height: '100%',
    position: 'absolute',
    left: '10%',
    top: em(5),
  },

  bg: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    top: 0, left: 0,
  }
})
