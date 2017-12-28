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

export default class PaywallView extends Component {
  constructor(props) {
    super(props)
    this._balloonerY = new Animated.Value(screenHeight)
    this._balloonerX = new Animated.Value(-screenWidth * 0.9)
    // this._balloonerY = new Animated.Value(screenHeight)
    // this._balloonerX = new Animated.Value()
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this._balloonerY, {
        toValue: 0,
        duration: 4000,
        delay: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(this._balloonerX, {
        toValue: 0,
        duration: 4000,
        delay: 1000,
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

          <Text style={[style.teaser, base.text]}>
            There are only 100 spots available for our first members only party in LA.
          </Text>

          <View style={style.payBtnCont}>
            <TouchableOpacity style={[base.button, style.mainButton]} onPress={() => props.buy(product.identifier)}>
              <Text style={[base.buttonText, style.payBtn]}>Join for {product.priceString}/month</Text>
            </TouchableOpacity>
            <Text style={base.text}>{`Payment starts Valentine's Day.`}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: screenHeight*0.1,
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
})
