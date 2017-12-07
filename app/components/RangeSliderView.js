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
    this.state = {
      poopX: new Animated.Value(0)
    }

    this.calculatePositions = this.calculatePositions.bind(this)
  }

  componentDidMount() {
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
          // state[`mRes${i}`].ogx = state[`mRes${i}`].x._value
          // this.setState(state)
          // let rando = Math.random() * this.state.trackDims.width
          // console.log('RANDO', rando)
          // Animated.spring(this.state[`${i}X`], {
          //   // toValue: this.state[`mRes${i}`].ogx + gestureState.dx
          //   toValue: 100
          // }).start(() => console.log(this.state[`${i}X`]))
          state[`${i}OGX`] = state[`${i}X`]._value
          this.setState(state)
        },

        onPanResponderMove: (evt, gestureState) => {
          // return
          let anim
          // state[`mRes${i}`].x = state[`mRes${i}`].ogx + gestureState.dx
          anim = Animated.spring(this.state[`${i}X`], {
            // toValue: this.state[`mRes${i}`].ogx + gestureState.dx
            toValue: this.state[`${i}OGX`] + gestureState.dx
          })

          // if (this.state[`${i}X`]._value > this.state.trackDims.width) { // Too high
          //     anim = Animated.spring(this.state[`${i}X`], {
          //       toValue: state.trackDims.width
          //     })
          //     // state[`mRes${i}`].x = state.trackDims.width
          // }
          // if (this.state[`${i}X`]._value < 0) { // Too low
          //     anim = Animated.spring(this.state[`${i}X`], {
          //       toValue: 0
          //     })
          //     // state[`mRes${i}`].x = 0
          // }

          // this.setState(state)
          anim.start(
            // () => this.props.onUpdate(this.calculatePositions())
          )
        },

        onPanResponderTerminationRequest: (evt, gestureState) => true,

        onPanResponderRelease: (evt, gestureState) => {
          // this.props.onGestureEnd()
        },

        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      })
    }

    this.poopHandler = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        console.log("poop granted")
        // Animated.spring(this.state.poopX, {
        //   toValue: Math.random() * this.state.trackDims.width
        // }).start()
        let s = this.state
        s['poopOGX'] = this.state.poopX._value
        this.setState(s)
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.spring(this.state.poopX, {
          toValue: this.state.poopOGX + gestureState.dx
        }).start()
      }
    })
  }

  calculatePositions() {
    const { trackDims } = this.state
    const percents = Object.keys(this.panHandlers).map((k,i) => {
      return this.state[`${i}X`]._value / trackDims.width
    })
    return percents.sort()
  }

  render() {
    const { props, state } = this
    const fullDiameter = props.markerDiameter + props.markerStrokeWidth
    if (props.debug) {console.log(state)}
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
          Object.keys(this._panHandlers).map((m,i) => {
            // const startPct = new Animated.Value(((props.values[i] - props.minValue) / (props.maxValue - props.minValue)) * state.trackDims.width)
            return( !state[`${i}X`] ? null :
              <Animated.View
                {...this._panHandlers[m].panHandlers}
                key={i}
                onLayout={(e) => {
                  // let s = this.state
                  // // for (let i = 0; i < this.props.numMarkers; i++) {
                  //   s[`${i}X`] = new Animated.Value((this.props.values[i] - this.props.minValue) / (this.props.maxValue - this.props.minValue) * s.trackDims.width)
                  // // }
                  // this.setState(s)
                }}
                style={{
                  position: 'absolute',
                  // top: 0,
                  left: state[`${i}X`],
                  width: props.markerDiameter,
                  height: props.markerDiameter,
                  // borderRadius: props.markerDiameter * 0.5,
                  backgroundColor: props.markerFill,
                  // borderColor: props.markerStroke,
                  // borderWidth: props.markerStrokeWidth,
                }} />
            )
          })
        }
        {
          !state.trackDims ? null :
          <Animated.View
            {...this.poopHandler.panHandlers}
            onLayout={() => {
              // let s = this.state
              // let v = (this.props.values[0] - this.props.minValue) / (this.props.maxValue - this.props.minValue) * s.trackDims.width
              // console.log("POOOOP", v)
              // s.poopX = Animated.add(state.poopX, v)
              // this.setState(s)
            }}
            style={{
              position: 'absolute',
              top: '100%',
              left: state['poopX'],
              width: 40,
              height: 40,
              backgroundColor: 'pink',
            }} />
        }
      </View>
    )
  }
}

const style = StyleSheet.create({

})
