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

export default class MembershipDeckView extends Component {
  constructor(props) {
    super(props)
    this._indexMarkerX = new Animated.Value(0)
    this.handleScroll = this.handleScroll.bind(this)
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
                  data={props.slides || []}
                  horizontal
                  onMomentumScrollEnd={this.handleScroll}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) => item } />
          <View style={style.indexes}>
            <View style={{flexDirection: 'row'}}>
            {
              (props.slides || []).map((s,i,a) => {
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

export class Slide extends Component {
  render() {
    const {props, state} = this
    return(
      <View style={style.slide}>
        <Image style={style.slideBg}
               resizeMode="cover"
               prefetch={true}
               source={props.bg} />
        <BlurView style={style.slideBlur}
                  blurType="light"
                  blurAmount={4}
                  viewRef={null/* required for Android */} />
        <Animated.View style={{opacity: props.hideOpacity}}>
          {props.children}
        </Animated.View>
      </View>
    )
  }
}

const idxWidth = em(0.66)
const idxMargin = em(0.5)
const idxBorder = 2

const style = StyleSheet.create({
  container: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'},
  deck: {flex: 1, backgroundColor: mayteBlack()},
  slide: {width: screenWidth, height: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: screenWidth * 0.05, paddingRight: screenWidth * 0.05},
  slideBg: {position: 'absolute', width: screenWidth, height: '100%'},
  slideBlur: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: mayteWhite(0.5)},
  indexes: {position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', bottom: 0, left: 0, width: '100%', height: em(3)},
  index: {width: idxWidth, height: idxWidth, borderRadius: idxWidth/2, borderWidth: idxBorder, borderColor: mayteBlack()},
  indexMarker: {position: 'absolute', left: 0, width: idxWidth, height: idxWidth, borderRadius: idxWidth/2, backgroundColor: mayteBlack()},
})
