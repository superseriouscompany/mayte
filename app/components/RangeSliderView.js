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

    this.state = {
      trackLength: 0,
    }

    for (let i = 0; i < props.numMarkers; i++) {
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

          if (state[`mRes${i}`].x > state.trackDims.width) {
              console.log("too high")
              state[`mRes${i}`].x = state.trackDims.width
          }

          if (state[`mRes${i}`].x < 0) {
              console.log("too low")
              state[`mRes${i}`].x = 0
          }

          this.setState(state)
        },

        onPanResponderTerminationRequest: (evt, gestureState) => true,

        onPanResponderRelease: (evt, gestureState) => {
          this.props.onGestureEnd()
          console.log("FINISHED:", this.state[`mRes${i}`])
          // console.log(this.state.trackDims)
          // const { trackDims, x } = this.state
          // const { markerRadius } = props
          //
          // const pct = gestureState.x + markerRadius / trackDims.width
          // console.log(pct, gestureState.x, markerRadius, trackDims.width)
        },

        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      })
    }
  }

  componentWillMount() {
  }

  render() {
    const { props, state } = this
    const fullDiameter = props.markerDiameter + props.markerStrokeWidth
    return(
      <View style={{
              width: '100%',
              justifyContent: 'center',
              height: Math.max(fullDiameter, props.trackHeight),
              backgroundColor: 'pink',
              paddingLeft: props.markerDiameter * 0.5,
              paddingRight: props.markerDiameter * 0.5,
            }}>
        <View style={{
                height: props.trackHeight,
                backgroundColor: props.trackColor,
                width: '100%',
              }}
              onLayout={(e) => this.setState({trackDims: e.nativeEvent.layout})} />
        { this.panHandlers ?
          Object.keys(this.panHandlers).map((m,i) => {
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
                  top: 0, left: state[`mRes${i}`].x,
                  width: props.markerDiameter,
                  height: props.markerDiameter,
                  borderRadius: props.markerDiameter * 0.5,
                  backgroundColor: props.markerFill,
                  borderColor: props.markerStroke,
                  borderWidth: props.markerStrokeWidth,
                }} />
            )
          }) : null
        }
      </View>
    )
  }
}

const style = StyleSheet.create({

})
