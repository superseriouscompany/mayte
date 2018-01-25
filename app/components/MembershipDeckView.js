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
  ActivityIndicator,
} from 'react-native'

export default class MembershipDeckView extends Component {
  constructor(props) {
    super(props)
    this._bgOpacities = {}
    this.state = {}
    props.children.forEach((c,i) => this._bgOpacities[i] = new Animated.Value(0))
    this._indexMarkerX = new Animated.Value(0)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    Animated.timing(this._bgOpacities[0], {
      toValue: 1,
      duration: 333,
      useNativeDriver: true,
    }).start()
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

    Animated.parallel(Object.keys(this._bgOpacities).map((b,i) => {
      return Animated.timing(this._bgOpacities[b], {
        toValue: i == idx ? 1 : 0,
        duration: 333,
        useNativeDriver: true,
      })
    })).start()
  }

  render() {
    const {props, state} = this
    return (
      <View style={style.container}>
        {
          (props.children || []).filter(c => c).map((s,i,a) => {
            return <Animated.Image
                     key={i}
                     resizeMode='cover'
                     style={[style.slideBg, {opacity: this._bgOpacities[i]}]}
                     source={s.props.bg}
                     prefetch={true} />
          })
        }
        <FlatList style={[style.deck]}
                  ref={(el) => this.deck = el}
                  bounces={false}
                  pagingEnabled
                  data={props.children || []}
                  horizontal
                  onMomentumScrollBegin={this.handleMomentumStart}
                  onMomentumScrollEnd={this.handleScroll}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) => item } />
          <View style={style.indexes}>
            <View style={{flexDirection: 'row'}}>
            {
              (props.children || []).filter(c => c).map((s,i,a) => {
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
      <View style={[style.slide, props.style]}>
        {
          !props.blur ? null :
          <BlurView style={[style.slideBlur, props.styleBlur, {opacity: this._opacity}]}
                    blurType="light"
                    blurAmount={0}
                    viewRef={null/* required for Android */} />
        }
        <Animated.View style={[style.slideCont, {opacity: this._opacity}]}>
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
  deck: {flex: 1, backgroundColor: 'transparent'},
  slide: {width: screenWidth, height: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: screenWidth * 0.05, paddingRight: screenWidth * 0.05},
  slideBg: {position: 'absolute', width: '100%', height: '100%', top: 0, left: 0,},
  slideBlur: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: mayteWhite(0.5)},
  slideCont: {justifyContent: 'center', alignItems: 'center'},
  indexes: {position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', bottom: 0, left: 0, width: '100%', height: em(3)},
  index: {width: idxWidth, height: idxWidth, borderRadius: idxWidth/2, borderWidth: idxBorder, borderColor: mayteBlack()},
  indexMarker: {position: 'absolute', left: 0, width: idxWidth, height: idxWidth, borderRadius: idxWidth/2, backgroundColor: mayteBlack()},
})
