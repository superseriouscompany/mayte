'use strict'

import React, {Component}          from 'react'
import {BlurView}                  from 'react-native-blur'
import {ButtonBlack}               from './Button'
import {
  screenWidth,
  screenHeight,
  em,
} from '../constants/dimensions'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Easing,
  Animated,
  StyleSheet,
} from 'react-native'

const particleMaxRadius = 30

export default class WaitingRoomView extends Component {
  render() {
    const {props} = this

    return (
      <View style={style.container}>
        <ParticleSheet count={6} loopLegnth={10000} scale={0.4} particleStyle={{opacity: 0.4}} />
        <ParticleSheet count={6} loopLength={15000} scale={0.8} particleStyle={{opacity: 0.8}} />
        <ParticleSheet count={6} loopLength={20000} scale={1} />

        <Image style={[style.icon]}
               source={require('../images/unicorn-icon-black.png')}
               resizeMode="contain" />
        <Image style={[style.logo]}
               source={require('../images/unicorn-logo-black.png')}
               resizeMode="contain" />

        <Text style={style.copy}>Your application is processing. We will notify you upon approval.</Text>

        <ButtonBlack
          style={style.button}
          text="Got It" />

        { !__DEV__ ? null :
          <TouchableOpacity style={{marginTop: em(1)}} onPress={props.deleteAccount}>
            <Text style={{color: 'red', backgroundColor: 'transparent'}}>Delete Account</Text>
          </TouchableOpacity> }
      </View>
    )
  }
}

class ParticleSheet extends Component {
  constructor(props) {
    super(props)
    this._translateY = new Animated.Value(0)
    this.renderParticles = this.renderParticles.bind(this)
  }
  componentDidMount() {
    Animated.loop(
      Animated.timing(this._translateY, {
        toValue: -screenHeight,
        duration: this.props.loopLength,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start()
  }
  renderParticles(count) {
    var ps = []
    var i = 0
    while (i < count*2) {
      var source = particles[Math.round(Math.random() * particles.length)]
      var top = Math.random() * screenHeight
      var left = Math.random() * screenWidth - particleMaxRadius
      var scale = ((Math.random() * 0.8) + 0.2) * this.props.scale
      var durationRotate = scale*this.props.durationRotate
      ps.push(
        <Particle
          key={i}
          source={source}
          style={[{top: top, left: left}, this.props.particleStyle]}
          durationRotate={durationRotate}
          scale={scale} />,
        <Particle
          key={i+1}
          source={source}
          style={[{top: screenHeight + top, left: left}, this.props.particleStyle]}
          durationRotate={durationRotate}
          scale={scale} />
      )
      i += 2
    }
    return ps
  }
  render() {
    return(
      <Animated.View style={[particleStyle.sheet, {transform: [{translateY: this._translateY}]}]}>
        {this.renderParticles(this.props.count)}
      </Animated.View>
    )
  }
}

ParticleSheet.defaultProps = {
  loopLength: 10000,
  durationRotate: 10000,
  scale: 1,
  gender: null,
}

const cornWidth = screenWidth * 0.66

const style = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center',},
  icon: {height: em(5), width: em(5), marginBottom: em(1),},
  logo: {marginBottom: em(3), height: em(1.2), width: em(6),},
  copy: {width: '80%', fontSize: em(1), marginBottom: em(3), fontFamily: 'Gotham-Medium', textAlign: 'center', backgroundColor: 'transparent'},
  button: {paddingLeft: em(2.66), paddingRight: em(2.66),},
  fragment: {position: 'absolute', width: '100%', height: '50%'},
  bgBlur: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'},
})

class Particle extends Component {
  constructor(props) {
    super(props)
    this._rotation = new Animated.Value(0)
    this._translateY = new Animated.Value(0)
  }
  componentDidMount() {
    Animated.loop(
      Animated.timing(this._rotation, {
        toValue: 100,
        duration: this.props.durationRotate,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start()
  }
  render() {
    const {props, state} = this
    const interpolatedRot = this._rotation.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg']
    })
    return <Animated.Image
             source={props.source}
             resizeMode='contain'
             style={[
               particleStyle.particle,
               props.style,
               {
                 transform: [
                   {scale: props.scale},
                   {rotate: interpolatedRot},
                 ]
               }
             ]} />
  }
}

Particle.defaultProps = {
  durationRotate: 3000,
}

const particleStyle = StyleSheet.create({
  sheet: {
    position: 'absolute',
    top: 0, left: 0,
    width: screenWidth,
    height: screenHeight * 2,
  },
  particle: {
    width: particleMaxRadius * 2,
    height: particleMaxRadius * 2,
    position: 'absolute',
  }
})

const particles = [
  require('../images/fragments/Asset_1.png'),
  require('../images/fragments/Asset_2.png'),
  require('../images/fragments/Asset_3.png'),
  require('../images/fragments/Asset_4.png'),
  require('../images/fragments/Asset_5.png'),
  require('../images/fragments/Asset_6.png'),
  require('../images/fragments/Asset_7.png'),
  require('../images/fragments/Asset_8.png'),
  require('../images/fragments/Asset_9.png'),
  require('../images/fragments/Asset_10.png'),
  require('../images/fragments/Asset_11.png'),
  require('../images/fragments/Asset_12.png'),
  require('../images/fragments/Asset_13.png'),
  require('../images/fragments/Asset_14.png'),
  require('../images/fragments/Asset_15.png'),
  require('../images/fragments/Asset_16.png'),
  require('../images/fragments/Asset_17.png'),
  require('../images/fragments/Asset_18.png'),
  require('../images/fragments/Asset_19.png'),
  require('../images/fragments/Asset_20.png'),
  require('../images/fragments/Asset_21.png'),
  require('../images/fragments/Asset_22.png'),
  require('../images/fragments/Asset_23.png'),
  require('../images/fragments/Asset_24.png'),
  require('../images/fragments/Asset_25.png'),
  require('../images/fragments/Asset_26.png'),
  require('../images/fragments/Asset_27.png'),
  require('../images/fragments/Asset_28.png'),
  require('../images/fragments/Asset_29.png'),
  require('../images/fragments/Asset_30.png'),
  require('../images/fragments/Asset_31.png'),
  require('../images/fragments/Asset_32.png'),
  require('../images/fragments/Asset_33.png'),
  require('../images/fragments/Asset_34.png'),
  require('../images/fragments/Asset_35.png'),
  require('../images/fragments/Asset_36.png'),
  require('../images/fragments/Asset_37.png'),
  require('../images/fragments/Asset_38.png'),
  require('../images/fragments/Asset_39.png'),
  require('../images/fragments/Asset_40.png'),
  require('../images/fragments/Asset_41.png'),
  require('../images/fragments/Asset_42.png'),
  require('../images/fragments/Asset_43.png'),
  require('../images/fragments/Asset_44.png'),
  require('../images/fragments/Asset_45.png'),
  require('../images/fragments/Asset_46.png'),
  require('../images/fragments/Asset_47.png'),
  require('../images/fragments/Asset_48.png'),
  require('../images/fragments/Asset_49.png'),
  require('../images/fragments/Asset_50.png'),
  require('../images/fragments/Asset_51.png'),
  require('../images/fragments/Asset_52.png'),
  require('../images/fragments/Asset_53.png'),
]
