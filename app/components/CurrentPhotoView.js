import React, { Component } from 'react'
import { em, screenWidth } from '../constants/dimensions'
import {
  Image,
  Animated,
  StyleSheet,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native'

export default class CurrentPhotoView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: new Animated.ValueXY(props.targetPositions[props.idx]),
      active: false,
    }
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps.idx, this.props.idx)
    if (prevProps.idx != this.props.idx) {
      console.log(this.props.targetPositions[this.props.idx])
      Animated.spring(this.state.offset, {
        toValue: this.props.targetPositions[this.props.idx]
      }).start()
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({active: true})
        // this.activeTO = setTimeout(() => {
          this.startX = this.state.offset.x._value
          this.startY = this.state.offset.y._value
          this.props.toggleActive()
        // }, 500)
      },

      onPanResponderMove: (evt, gestureState) => {
        if (!this.props.active) return

        Animated.spring(this.state.offset, {
          toValue: {
            x: this.startX + gestureState.dx,
            y: this.startY + gestureState.dy,
          }
        }).start()

      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        if (!this.props.active) {
          clearTimeout(this.activeTO)
        } else {
          this.props.toggleActive()
          Animated.spring(this.state.offset, {
            toValue: this.props.targetPositions[this.props.idx]
          }).start(() => this.setState({active: false}))
        }
      },

      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  }

  render() {
    const { props, state } = this
    return (
        <Animated.Image source={{uri: props.photo.url}}
               {...this._panResponder.panHandlers}
               style={[
                 props.style,
                 {
                   transform: [
                     // {scale: props.active ? 0.9 : 1},
                     {translateX: state.offset.x},
                     {translateY: state.offset.y}
                   ],
                   zIndex: state.active ? 1 : 0,
                 }
               ]} />
    )
  }
}

const style = StyleSheet.create({

})
