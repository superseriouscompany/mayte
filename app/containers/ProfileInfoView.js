'use strict'

import React, {Component} from 'react'
import LinearGradient     from 'react-native-linear-gradient'
import transformUtil      from '../util/transform'
import {mayteBlack}       from '../constants/colors'
import {
  em,
  screenHeight,
  notchHeight,
  tabNavHeight,
  bottomBoost,
} from '../constants/dimensions'
import {
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

const fullHeight = screenHeight - tabNavHeight - bottomBoost

export default class ProfileInfoView extends Component {
  constructor(props) {
    super(props)

    this.infoClosedTop = screenHeight - notchHeight*2 -
                       ( props.hideButtons ?
                           props.myProfile ?
                             em(1) * 11.25 : em(1) * 11.25 + matchHeaderHeight + notchHeight :
                           em(1) * 15 )

    // THIS IS HACKY AS FUCK
    this._dynamicY = new Animated.Value(this.infoClosedTop)
    this._staticY = new Animated.Value(this.infoClosedTop)

    this._height = new Animated.Value(this.computeHeight(this.infoClosedTop))

    this._opacity = new Animated.Value(1),

    this.state = {
      interacting: false,
    }

    this.animateTo = this.animateTo.bind(this)
    this.animateOpen = this.animateOpen.bind(this)
    this.animateClosed = this.animateClosed.bind(this)
  }

  computeScale(top) {
    const base = screenHeight - tabNavHeight - bottomBoost
    return (base - top) / base
  }

  computeHeight(top) {
    return screenHeight - top - tabNavHeight - bottomBoost
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.props.open) {
      this.animateOpen()
    }
    if (!nextProps.open && this.props.open) {
      this.animateClosed()
    }
  }

  animateTo(loc) {
    Animated.parallel([
      Animated.timing(this._dynamicY, {
        toValue: loc,
        duration: 0,
      }),
      Animated.timing(this._height, {
        toValue: this.computeHeight(loc),
        duration: 0,
      })
    ]).start()
  }

  animateOpen() {
    this.props.setOpen(true)
    this._dynamicY = new Animated.Value(0)
    Animated.parallel([
      Animated.spring(this._staticY, {
        toValue: 0,
        velocity: 200,
        useNativeDriver: true,
      }),
      Animated.spring(this._height, {
        toValue: this.computeHeight(0),
        velocity: 200,
        overshootClamping: true,
      })
    ]).start()
  }

  animateSub() {
    Animated.timing(this._y, {
      toValue: this.infoClosedTop,
      duration: profileSwitch,
      useNativeDriver: true,
    }).start()
  }

  animateClosed() {
    this.props.setOpen(false)
    this.node._component.scrollTo({y:0, animated: true})
    this._dynamicY = new Animated.Value(this.infoClosedTop)
    Animated.parallel([
      Animated.spring(this._staticY, {
        toValue: this.infoClosedTop,
        velocity: 200,
        useNativeDriver: true,
      }),
      Animated.spring(this._height, {
        toValue: this.computeHeight(this.infoClosedTop),
        velocity: 200,
        overshootClamping: true,
      })
    ]).start()
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // https://github.com/facebook/react-native/issues/3082
        // console.log("granting")
        // if (this.props.open) {
        //   console.log("bish open")
        //   return false
        // }
        if (gestureState.dx !== 0 || gestureState.dy !== 0) {
          return true
        }
        return false
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({interacting: true})
        this._panStartY = this._dynamicY._value
      },

      onPanResponderMove: (evt, gestureState) => {
        this.newY = this._panStartY + gestureState.dy
        // this.flushTransform(this.grad, this.newY)
        this.animateTo(this.newY)
      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        // let open = this.state.open
        this._staticY = new Animated.Value(this.newY)
        if (this.newY > this._panStartY + 50) {
          this.animateClosed()
        } else if (this.newY < this._panStartY - 50) {
          this.animateOpen()
        } else {
          this.state.open ? this.animateOpen() : this.animateClosed()
        }
        this.setState({interacting: false})
      },

      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  }

  flushTransform(ref, y) {
    const matrix = transformUtil.scaleY(this.computeScale(y))
    transformUtil.origin(matrix,{x: 0, y: -(this.computeHeight(0)/2), z: 0})
    ref.setNativeProps({
      style: {
        transform: [
          {scaleY: 0.5},
          {matrix}
        ]
      }
    })
  }

  componentDidMount() {
    console.log(this.node)
  }

  render() {
    const {props,state} = this
    return (
      <Animated.ScrollView
        ref={n => this.node = n}
        scrollEventThrottle={100}
        bounces={true}
        // scrollEnabled={props.open ? true : false}
        scrollEnabled={false}
        onScroll={(e) => {
          const {contentOffset} = e.nativeEvent
          if (contentOffset.y < 0) {
            this.props.setOpen(false)
          }
        }}
        style={[
          props.style,
          style.content,
          {backgroundColor: mayteBlack(0.33), overflow: 'visible'},
          {transform: [{translateY: state.interacting ? this._dynamicY : this._staticY}]}
        ]}
        {...this._panResponder.panHandlers}>

          {props.children}

      </Animated.ScrollView>
    )
  }
}

const style = StyleSheet.create({
  content: {
    width: '100%',
    height: fullHeight + em(2), // TEMP: prevent awkward overflow on spring
  },
})
