'use strict'

import React, {Component} from 'react'
import Text from './Text'
import {em, screenWidth, screenHeight} from '../constants/dimensions'
import base from '../constants/styles'
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

export default class PaywallView extends Component {
  constructor(props) {
    super(props)
    this._balloonerY = new Animated.Value(screenHeight)
    this._balloonerX = new Animated.Value(-screenWidth * 0.9)

    this.numFetti = 3
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this._balloonerY, {
        toValue: 0,
        duration: 4000,
        delay: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(this._balloonerX, {
        toValue: 0,
        duration: 4000,
        delay: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ]).start()
  }

  render() {
    const {props,state} = this
    const product = (props.products || [])[0]

    return (
      <View style={style.container}>
      { product ?
        <View style={[style.container, {alignItems: 'center'}]}>
          <Animated.View style={[
                           style.ballooner,
                           {transform: [{translateX: this._balloonerX}, {translateY: this._balloonerY}]},
                           // {transform: [{translateX: this._balloonerX}]}
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

          <Firework color='pink' delay={0} style={[calculateFireworkOffset(-em(2),-em(2))]} />
          <Firework color='lightblue' delay={1000} style={[calculateFireworkOffset(em(1),0)]} />
          <Firework color='gold' delay={2000} style={[calculateFireworkOffset(-em(1),em(2))]} />

          <Text style={[style.teaser, base.text]}>
            There are only 100 spots available for our first members only party in LA.
          </Text>

          <View style={style.payBtnCont}>
            <TouchableOpacity style={[base.button, style.mainButton]} onPress={() => props.buy(product.identifier)}>
              <Text style={[base.buttonText, style.payBtn]}>Join for {product.priceString}/month</Text>
            </TouchableOpacity>
            <Text style={[base.text]}>{`Payment starts Valentine's Day.`}</Text>
          </View>

          <TouchableOpacity style={[style.backdoor]} onPress={props.visitVipWall}>
            <Text style={[{backgroundColor:'transparent'}, base.text]}>I have a VIP Code</Text>
          </TouchableOpacity>
        </View>
        :
        <View style={style.loadingCnr}>
          <ActivityIndicator size="large" />
        </View>
      }
      </View>
    )

  }
}

class Firework extends Component {
  constructor(props) {
    super(props)
    this._explode = new Animated.Value(0)
    this._driftY  = new Animated.Value(0)
    this._opacity = new Animated.Value(1)
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this._explode, {
        delay: this.props.delay || 0,
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(this._driftY, {
          toValue: 100,
          duration: 8000,
          useNativeDriver: true,
        }),
        Animated.timing(this._opacity, {
          toValue: 0,
          duration: 8000,
          useNativeDriver: true,
        })
      ])
    ]).start()
  }

  render() {
    const {props,state} = this
    return(
      <Animated.View style={[style.firework, props.style, {opacity:this._opacity, transform: [{scale:this._explode}, {translateY:this._driftY}]}]}>
        <View style={[{top:0, left: 0}, style.spark, {backgroundColor: props.color}]} />
        <View style={[{top:0, right: 0}, style.spark, {backgroundColor: props.color}]} />
        <View style={[{top:-(fireworkDiameter/4), left: fireworkDiameter/2 - sparkDiameter/2}, style.spark, {backgroundColor: props.color}]} />
        <View style={[{bottom:0, left: 0}, style.spark, {backgroundColor: props.color}]} />
        <View style={[{bottom:0, right: 0}, style.spark, {backgroundColor: props.color}]} />
        <View style={[{bottom:-(fireworkDiameter/4), left: fireworkDiameter/2 - sparkDiameter/2}, style.spark, {backgroundColor: props.color}]} />
        <View style={[{top:fireworkDiameter/2 - sparkDiameter/2, left: -(fireworkDiameter/4)}, style.spark, {backgroundColor: props.color}]} />
        <View style={[{top:fireworkDiameter/2 - sparkDiameter/2, right: -(fireworkDiameter/4)}, style.spark, {backgroundColor: props.color}]} />
      </Animated.View>
    )
  }
}

const fireworkDiameter = 150
const sparkDiameter = em(1)

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  teaser: {
    padding: em(1.66),
    fontSize: em(2),
    backgroundColor: 'transparent',
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
    marginBottom: em(1)
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

  firework: {
    width: fireworkDiameter,
    height: fireworkDiameter,
    position: 'absolute',
  },
  spark: {
    width: sparkDiameter,
    height: sparkDiameter,
    borderRadius: sparkDiameter/2,
    position: 'absolute',
  }
})
