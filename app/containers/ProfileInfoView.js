'use strict'

import React, {Component} from 'react'
import LinearGradient     from 'react-native-linear-gradient'
import transformUtil      from '../util/transform'
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
  View,
} from 'react-native'

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

    this._dynamicOp = new Animated.Value(0)
    this._staticOp = new Animated.Value(0)

    this._scale = new Animated.Value(this.computeScale(this.infoClosedTop))

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

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.open && !prevState.open) {
    //   this.animateOpen()
    // }
    //
    // if (!this.state.open && prevState.open) {
    //   this.animateClosed()
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.props.open) {
      this.animateOpen()
    }
  }

  animateTo(loc) {
    Animated.parallel([
      Animated.timing(this._dynamicY, {
        toValue: loc,
        duration: 0,
      }),
      Animated.timing(this._scale, {
        toValue: this.computeScale(loc),
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
      Animated.spring(this._scale, {
        toValue: this.computeScale(0),
        velocity: 200,
        overshootClamping: true,
      })
    ]).start(
      // () => this.flushTransform(this.grad, 0)
    )

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
    this._dynamicY = new Animated.Value(this.infoClosedTop)
    Animated.parallel([
      Animated.spring(this._staticY, {
        toValue: this.infoClosedTop,
        velocity: 200,
        useNativeDriver: true,
      }),
      Animated.spring(this._scale, {
        toValue: this.computeScale(this.infoClosedTop),
        velocity: 200,
        overshootClamping: true,
      })
    ]).start(
      // () => this.flushTransform(this.grad, this.infoClosedTop)
    )
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // https://github.com/facebook/react-native/issues/3082
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
    // this.flushTransform(this.grad, this.infoClosedTop)
  }

  render() {
    const {props,state} = this
    return (
      <Animated.View
        style={[
          props.style,
          {backgroundColor: 'rgba(40,40,40,0.4)'},
          {transform: [{translateY: state.interacting ? this._dynamicY : this._staticY}]}
        ]}
        {...this._panResponder.panHandlers}>
        {props.children}
      </Animated.View>
    )
  }
}

// <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.66)']}
//                 style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}} />
