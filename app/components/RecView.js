'use strict'

import React, {Component} from 'react'
import ProfileView        from './ProfileView'
import timing             from '../constants/timing'
import {
  screenWidth,
  screenHeight
} from '../constants/dimensions'
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  View,
} from 'react-native'

export default class RecView extends Component {
  constructor(props) {
    super(props)
    this._opacity = new Animated.Value(1)
    this._x = new Animated.Value(0)
    this.state = {infoOpen: false}
  }

  animateLike() {
    Animated.parallel([
      Animated.timing(this._x, {
        toValue: screenWidth,
        duration: timing.recLike,
        useNativeDriver: true,
      }),
      Animated.timing(this._opacity, {
        toValue: 0,
        duration: timing.recLike,
        useNativeDriver: true,
      })
    ]).start()
  }

  animatePass() {
    Animated.parallel([
      Animated.timing(this._x, {
        toValue: -screenWidth,
        duration: timing.recPass,
        useNativeDriver: true,
      }),
      Animated.timing(this._opacity, {
        toValue: 0,
        duration: timing.recPass,
        useNativeDriver: true,
      })
    ]).start()
  }

  render() {
    const {props, state} = this
    return (
      <Animated.View style={[
                      {left: 0, opacity: this._opacity, transform: [{translateX: this._x}]},
                      style.wrapper
                    ]}>
        <ProfileView {...props}
          user={props.rec}
          viewHeight={props.viewHeight}
          setHeight={props.setHeight}
          infoOpen={state.infoOpen}
          like={() => {this.animateLike(); props.like(props.rec) /* TODO: do this after the animation to avoid swapping if API call returns too fast*/ }}
          pass={() => {this.animatePass(); props.pass(props.rec)}} />
      </Animated.View>
    )
  }
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
  },

  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
})
