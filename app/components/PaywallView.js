'use strict'

import React, {Component}       from 'react'
import Text                     from './Text'
import base                     from '../constants/styles'
import {ButtonBlack}            from './Button'
import Firework, {FireworkShow} from './Firework'
import {ParticleSheet}          from './Particle'
import {
  mayteRed,
  mayteNavy,
  mayteGold,
  maytePurple,
  mayteBlue,
  mayteGreen,
} from '../constants/colors'
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

const calculateFireworkOffset = (left, top) => {
  return {
    left: (screenWidth/2-fireworkDiameter/2) + left,
    top: (screenHeight/2-fireworkDiameter/2) + top,
  }
}
const fireworkDiameter = screenWidth * 0.6
const sparkDiameter = em(1)
const introFireworksLength = 2400

export default class PaywallView extends Component {
  constructor(props) {
    super(props)
    this._balloonerY  = new Animated.Value(screenHeight)
    this._balloonerX  = new Animated.Value(-screenWidth * 0.9)
    this._bgOpacity   = new Animated.Value(0)
    this._infoOpacity = new Animated.Value(0)
    this._contOpacity = new Animated.Value(1)

    this.state = {runShow: false}

    this.numFetti = 3
    this.exit = this.exit.bind(this)
  }

  componentDidMount() {
    Animated.sequence([
      Animated.delay(introFireworksLength),
      Animated.timing(this._infoOpacity, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      })
    ]).start(() => this.setState({runShow: true}))
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

          <Firework color={mayteRed()} delay={0} style={[calculateFireworkOffset(em(-2),em(-2))]} fireworkDiameter={fireworkDiameter} sparkDiameter={em(0.6)} numSparks={16} />
          <Firework color={mayteNavy()} delay={introFireworksLength*0.33} style={[calculateFireworkOffset(0,em(1))]} fireworkDiameter={fireworkDiameter} sparkDiameter={em(0.8)} numSparks={10} />
          <Firework color={mayteGold()} delay={introFireworksLength*0.66} style={[calculateFireworkOffset(em(2),em(1))]} fireworkDiameter={fireworkDiameter} sparkDiameter={em(0.6)} numSparks={16} />
          <Firework color={mayteGreen()} delay={introFireworksLength} style={[calculateFireworkOffset(em(-4),em(-2))]} fireworkDiameter={fireworkDiameter} sparkDiameter={em(0.6)} numSparks={16} />

            { !state.runShow ? null :
              <FireworkShow
                workDelay={1200}
                active={state.runShow}
                maxFireworkDiameter={fireworkDiameter}
                maxSparkDiameter={em(0.8)}
                maxNumSparks={16}
                origin={calculateFireworkOffset(0,0)}
                radius={em(4)}
                colors={[mayteRed(0.8), mayteNavy(0.8), mayteGold(0.8), maytePurple(0.8), mayteBlue(0.8), mayteGreen(0.8)]} /> }



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
                  <Text style={{textDecorationLine: 'underline'}}>Restore Purchases</Text>
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
    paddingTop: notchHeight/2 + em(3),
    width: '90%',
    flex: 1,
  },
  teaserHeader: {
    fontSize: em(2),
    marginBottom: em(2),
    textAlign: 'center',
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
