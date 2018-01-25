'use strict'

import React, {Component} from 'react'
import Text               from './Text'
import base               from '../constants/styles'
import {ButtonBlack}      from './Button'
import Firework           from './Firework'
import {ParticleSheet}    from './Particle'
import {mayteGreen}       from '../constants/colors'
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
    this._infoOpacity = new Animated.Value(0)
    this._contOpacity = new Animated.Value(1)

    this.numFetti = 3
    this.exit = this.exit.bind(this)
  }

  componentDidMount() {
    Animated.sequence([
      Animated.delay(800),
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
      Animated.parallel([
        Animated.timing(this._bgOpacity, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(this._infoOpacity, {
          toValue: 1,
          duration: 1000,
          delay: 500,
          useNativeDriver: true,
        })
      ])
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
        { product ?
          <Animated.View style={[style.container, {opacity: this._contOpacity}]}>

            <Firework color='#D42456' delay={0} style={[calculateFireworkOffset(em(-2),em(-2))]} fireworkDiameter={fireworkDiameter} sparkDiameter={em(0.6)} numSparks={16} />
            <Firework color='#2755A8' delay={800} style={[calculateFireworkOffset(em(1),0)]} fireworkDiameter={fireworkDiameter} sparkDiameter={em(0.8)} numSparks={10} />
            <Firework color='#FFCC00' delay={1600} style={[calculateFireworkOffset(em(-1),em(2))]} fireworkDiameter={fireworkDiameter} sparkDiameter={em(0.6)} numSparks={16} />
            <Firework color={mayteGreen()} delay={2400} style={[calculateFireworkOffset(em(-2),em(-4))]} fireworkDiameter={fireworkDiameter} sparkDiameter={em(0.6)} numSparks={16} />

            <Animated.View style={[style.container, {opacity: this._infoOpacity}]}>
              <ParticleSheet count={6} loopLength={10000} scale={0.4} particleStyle={{opacity: 0.4}} />
              <ParticleSheet count={6} loopLength={15000} scale={0.8} particleStyle={{opacity: 0.8}} />
              <ParticleSheet count={6} loopLength={20000} scale={1} />

              <View style={[style.teaser]}>
                <Text style={[base.text, style.teaserHeader]}>{`You're In.`}</Text>
                <Text style={[base.text, style.teaserText]}>
                  {`Invitations are limited. Sign up now and join us for our exclusive Valentine's Day launch party.`}
                </Text>
              </View>

              <View style={style.payBtnCont}>
                <ButtonBlack text={`Join for ${product.priceString}/month`} onPress={() => props.buy(product.identifier)} style={style.payBtn} />
                <Text style={[base.text, {marginTop: em(0.33)}]}>{`Payment starts Valentine's Day.`}</Text>
                <TouchableOpacity style={style.restorePurchases} onPress={props.restorePurchases}>
                  <Text>Restore Purchases</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
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
    alignItems: 'center',
  },
  teaser: {
    backgroundColor: 'transparent',
    marginTop: notchHeight/2 + em(3),
    width: '90%',
  },
  teaserHeader: {
    fontSize: em(2),
    textAlign: 'center',
    marginBottom: em(3),
  },
  teaserText: {
    fontSize: em(1.33),
    textAlign: 'center',
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
    marginBottom: bottomBoost + em(2),
  },
  payBtn: {
    marginBottom: em(0.5),
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
