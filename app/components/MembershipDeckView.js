'use strict'

import React, {Component} from 'react'
import {BlurView} from 'react-native-blur'
import {mayteWhite, mayteBlack} from '../constants/colors'
import {em, screenWidth, screenHeight} from '../constants/dimensions'
import {
  View,
  Text,
  Image,
  FlatList,
  Animated,
  StyleSheet,
} from 'react-native'

const slides = [
  {
    bg: require('../images/membership-deck-0.png'),
    title: 'YOU’RE IN',
    body: 'Your membership includes total access to exclusive social events, premium dating, and a world-class concierage service.',
  },
  {
    bg: require('../images/membership-deck-1.png'),
    title: 'FIRST CLASS',
    body: 'Monthly events include concerts, parties, dinners, and more — all-inclusive with your Unicorn membership.',
  },
  {
    bg: require('../images/membership-deck-2.png'),
    title: 'LIKE MAGIC',
    body: 'Why wait? Your membership gives you priority reservations with an elite network of establishments.',
  }
]

export default class MembershipDeckView extends Component {
  render() {
    const {props, state} = this
    return (
      <View style={style.container}>
        <FlatList style={[style.deck]}
                  bounces={false}
                  pagingEnabled
                  data={slides || []}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) =>
                    <View style={style.slide}>
                      <Image style={style.slideBg}
                             resizeMode="cover"
                             source={item.bg} />
                      <BlurView style={style.slideBlur}
                                blurType="light"
                                blurAmount={4}
                                viewRef={null/* required for Android */} />
                      <Animated.View style={{opacity: props.hideOpacity}}>
                        <Text style={[style.slideText, style.slideTitle]}>{item.title}</Text>
                        <Text style={[style.slideText, style.slideBody]}>{item.body}</Text>
                      </Animated.View>
                    </View>
                  } />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'},
  deck: {flex: 1, backgroundColor: mayteBlack()},
  slide: {width: screenWidth, height: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: screenWidth * 0.05, paddingRight: screenWidth * 0.05},
  slideBg: {position: 'absolute', width: screenWidth, height: '100%'},
  slideBlur: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: mayteWhite(0.5)},
  slideText: {color: mayteBlack(), textAlign: 'center', backgroundColor: 'transparent'},
  slideTitle: {fontFamily: 'Futura', fontWeight: '700', fontSize: em(2.33), letterSpacing: em(0.1), marginBottom: em(2)},
  slideBody: {fontFamily: 'Gotham-Medium', fontSize: em(1.2), lineHeight: em(1.6)},
})
