import React, { Component } from 'react'
import {
  PanResponder,
  StyleSheet,
  Animated,
  View,
  Text,
} from 'react-native'

export default class RangeSliderView extends Component {
  constructor(props) {
    super(props)

    this._panHandlers = {}
    this._highlightScale = new Animated.Value(1)
    this._highlightOffset = new Animated.Value(0)
    this.state = {}

    this.calculatePositions = this.calculatePositions.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.trackDims && this.state.trackDims) {

      let s = this.state
      for (let i = 0; i < this.props.numMarkers; i++) {
        s[`${i}X`] = new Animated.Value((this.props.values[i] - this.props.minValue) / (this.props.maxValue - this.props.minValue) * s.trackDims.width)
      }
      this.setState(s)
    }
  }

  componentWillMount() {
    for (let i = 0; i < this.props.numMarkers; i++) {
      // ^ FINALLY A USE FOR let - this doesn't work otherwise

      this._panHandlers[`mRes${i}`] = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          this.props.onGestureStart()
          let state = this.state
          state[`${i}OGX`] = state[`${i}X`]._value
          this.setState(state)
        },

        onPanResponderMove: (evt, gestureState) => {
          let value = this.state[`${i}OGX`] + gestureState.dx
          if (value < 0) {value = 0}
          if (value > this.state.trackDims.width) {value = this.state.trackDims.width}

          const pcts = this.calculatePositions()
          const hScale = pcts[pcts.length - 1] - (pcts.length > 1 ? pcts[0] : 0)
          const hOff = -0.5 * this.state.trackDims.width
          console.log(hOff)
          // const hOff = pcts[pcts.length - 1] * this.state.trackDims.width +
          //              (pcts.length > 1 ? pcts[0] : 0) * this.state.trackDims.width +
          //              0.5 * this.state.trackDims.width * (pcts.length > 1 ? pcts[0] : 0) * this.state.trackDims.width

          Animated.parallel([
            Animated.spring(this.state[`${i}X`], {
              toValue: value,
              stiffness: 250,
              overshootClamping: true,
            }),
            Animated.spring(this._highlightScale, {
              toValue: pcts[pcts.length - 1] - (pcts.length > 1 ? pcts[0] : 0),
              stiffNess: 250,
              overshootClamping: true,
              useNativeDriver: true,
            }),
            Animated.spring(this._highlightOffset, {
              toValue: hOff,
              stiffNess: 250,
              overshootClamping: true,
              useNativeDriver: true,
            }),
          ]).start(() => this.props.onUpdate(pcts))
        },

        onPanResponderTerminationRequest: (evt, gestureState) => true,

        onPanResponderRelease: (evt, gestureState) => {
          this.props.onGestureEnd()
        },

        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      })
    }
  }

  calculatePositions() {
    const { trackDims } = this.state
    const percents = Object.keys(this._panHandlers).map((k,i) => {
      return this.state[`${i}X`]._value / trackDims.width
    })
    return percents.sort()
  }

  render() {
    const { props, state } = this
    const fullDiameter = props.markerDiameter + props.markerStrokeWidth
    return(
      <View style={{
              width: '100%',
              justifyContent: 'center',
              height: Math.max(fullDiameter, props.trackHeight),
              paddingLeft: props.markerDiameter * 0.5,
              paddingRight: props.markerDiameter * 0.5,
            }}>
        <View style={{
                height: props.trackHeight,
                backgroundColor: props.trackColor,
                width: '100%',
              }}
              onLayout={(e) => this.setState({trackDims: e.nativeEvent.layout})} />
          <Animated.View
            style={{
            position: 'absolute',
            top: fullDiameter / 2 - props.trackHeight / 2,
            left: 0, right: 0,
            height: props.trackHeight,
            backgroundColor: props.trackHighlight,
            transform: [{scaleX: this._highlightScale}, {translateX: this._highlightOffset}],
          }} />
        { !state.trackDims ? null :
          Object.keys(this._panHandlers).map((m,i) => {
            return( !state[`${i}X`] ? null :
              <Animated.View
                {...this._panHandlers[m].panHandlers}
                key={i}
                hitSlop={{
                  top: (s = props.markerDiameter/2),
                  bottom: s, left: s, right: s
                }}
                ref={(el) => this[`marker${i}`] = el}
                style={{
                  top: 0,
                  left: state[`${i}X`],
                  position: 'absolute',
                  width: props.markerDiameter,
                  height: props.markerDiameter,
                  borderColor: props.markerStroke,
                  backgroundColor: props.markerFill,
                  borderWidth: props.markerStrokeWidth,
                  borderRadius: props.markerDiameter * 0.5,
                }} />
            )
          })
        }
      </View>
    )
  }
}
