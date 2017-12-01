import React, { Component } from 'react'
import {
  PanResponder,
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default class RangeSliderView extends Component {
  constructor(props) {
    super(props)

    this.panHandlers = {}
    this.state = {}

    this.calculatePositions = this.calculatePositions.bind(this)
  }

  componentWillMount() {
    for (let i = 0; i < this.props.numMarkers; i++) {
      // ^ FINALLY A USE FOR let - this doesn't work otherwise
      this.panHandlers[`mRes${i}`] = this.state[`mRes${i}`] = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          this.props.onGestureStart()
          let state = this.state
          state[`mRes${i}`].ogx = state[`mRes${i}`].x
          this.setState(state)
        },

        onPanResponderMove: (evt, gestureState) => {
          let state = this.state
          state[`mRes${i}`].x = state[`mRes${i}`].ogx + gestureState.dx

          if (state[`mRes${i}`].x > state.trackDims.width) { // Too high
              state[`mRes${i}`].x = state.trackDims.width
          }

          if (state[`mRes${i}`].x < 0) { // Too low
              state[`mRes${i}`].x = 0
          }

          this.setState(state)
          this.props.onUpdate(this.calculatePositions())
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
    const percents = Object.keys(this.panHandlers).map(k => {
      return this.state[k].x / trackDims.width
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
        { !state.trackDims ? null :
          Object.keys(this.panHandlers).map((m,i) => {
            const startPct = ((props.values[i] - props.minValue) / (props.maxValue - props.minValue)) * state.trackDims.width
            return(
              <View
                {...this.panHandlers[m].panHandlers}
                key={i}
                onLayout={(e) => {
                  let state = this.state
                  state[`mRes${i}`].x = e.nativeEvent.layout.x
                  this.setState(state)
                }}
                style={{
                  position: 'absolute',
                  top: 0, left: (state[`mRes${i}`].x || startPct),
                  width: props.markerDiameter,
                  height: props.markerDiameter,
                  borderRadius: props.markerDiameter * 0.5,
                  backgroundColor: props.markerFill,
                  borderColor: props.markerStroke,
                  borderWidth: props.markerStrokeWidth,
                }} />
            )
          })
        }
      </View>
    )
  }
}

const style = StyleSheet.create({

})
