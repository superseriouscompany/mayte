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
      x: 0,
      trackLength: 0,
    }
  }

  componentWillMount() {

    console.log("THIS.PANHANDLERS", this.panHandlers)
    // for (var i = 0; i < this.props.numMarkers; i++) {
    //   console.log("hi")
    // }

    for (var i = 0; i < this.props.numMarkers; i++) {
      this.panHandlers[`mRes${i}`] = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          this.panHandlers[`mRes${0}`].x = gestureState.x
        },

        onPanResponderMove: (evt, gestureState) => {
          console.log("MOVING", `mRes${i}`, this.panHandlers[`mRes${i}`])
          this.setState({x: this.panHandlers[`mRes${i}`].x + gestureState.dx})
        },

        onPanResponderTerminationRequest: (evt, gestureState) => true,

        onPanResponderRelease: (evt, gestureState) => {
          // console.log("FINISHED:", this[`mRes0`])
          // console.log(this.state.trackDims)
          const { trackDims, x } = this.state
          const { markerRadius } = this.props

          const pct = gestureState.x + markerRadius / trackDims.width
          console.log(pct, gestureState.x, markerRadius, trackDims.width)
        },

        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      })
    }
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
                style={{
                  position: 'absolute',
                  top: 0, left: state.x,
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
