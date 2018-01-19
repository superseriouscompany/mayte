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
  constructor(props) {
    super(props)
    this._indexMarkerX = new Animated.Value(0)
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount() {
    console.log(this.deck)
  }
  handleScroll(e) {
    const {x} = e.nativeEvent.contentOffset
    const {width} = e.nativeEvent.layoutMeasurement
    const idx = Math.floor(x/width)

    Animated.timing(this._indexMarkerX, {
      toValue: idx * (idxWidth + idxMargin),
      duration: 200,
      useNativeDriver: true,
    }).start()
  }
  render() {
    const {props, state} = this
    return (
      <View style={style.container}>
        <FlatList style={[style.deck]}
                  ref={(el) => this.deck = el}
                  bounces={false}
                  pagingEnabled
                  data={slides || []}
                  horizontal
                  onMomentumScrollEnd={this.handleScroll}
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
          <View style={style.indexes}>
            <View style={{flexDirection: 'row'}}>
            {
              slides.map((s,i,a) => {
                return <View key={i} style={[style.index, {marginRight: i == a.length - 1 ? 0 : em(0.5)}]} />
              })
            }
            <Animated.View style={[style.indexMarker, {transform: [{translateX: this._indexMarkerX}]}]} />
            </View>
          </View>
      </View>
    )
  }
}

const idxWidth = em(1)
const idxMargin = em(0.5)
const idxBorder = 2

const style = StyleSheet.create({
  container: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'},
  deck: {flex: 1, backgroundColor: mayteBlack()},
  slide: {width: screenWidth, height: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: screenWidth * 0.05, paddingRight: screenWidth * 0.05},
  slideBg: {position: 'absolute', width: screenWidth, height: '100%'},
  slideBlur: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: mayteWhite(0.5)},
  slideText: {color: mayteBlack(), textAlign: 'center', backgroundColor: 'transparent'},
  slideTitle: {fontFamily: 'Futura', fontWeight: '700', fontSize: em(2.33), letterSpacing: em(0.1), marginBottom: em(2)},
  slideBody: {fontFamily: 'Gotham-Medium', fontSize: em(1.2), lineHeight: em(1.6)},
  indexes: {position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', bottom: 0, left: 0, width: '100%', height: em(3)},
  index: {width: idxWidth, height: idxWidth, borderRadius: idxWidth/2, borderWidth: idxBorder, borderColor: mayteBlack()},
  indexMarker: {position: 'absolute', left: 0, width: idxWidth, height: idxWidth, borderRadius: idxWidth/2, backgroundColor: mayteBlack()},
})
