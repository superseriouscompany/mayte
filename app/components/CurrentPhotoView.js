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
      // opacity: new Animated.Value(1),
      scale: new Animated.Value(1),
      size: new Animated.Value(props.thumbWidth),
      trashable: false,
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

        // if (gestureState)
        // console.log(evt.nativeEvent.pageX, evt.nativeEvent.pageY, this.props.trashArea)

        if (evt.nativeEvent.pageX >= this.props.trashArea.pageX &&
            evt.nativeEvent.pageX <= this.props.trashArea.pageX + this.props.trashArea.width &&
            evt.nativeEvent.pageY >= this.props.trashArea.pageY &&
            evt.nativeEvent.pageY <= this.props.trashArea.pageY + this.props.trashArea.height) {
          if (!this.state.trashable) {
            console.log("trashable")
            this.setState({trashable: true})
            this.props.toggleTrashReady()
            Animated.timing(this.state.scale, {toValue: 0, duration: 500}).start()
          }
        } else if (this.state.trashable) {
          this.setState({trashable: false})
          Animated.timing(this.state.scale, {toValue: 1, duration: 500}).start()
          this.props.toggleTrashReady()
        }

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
          if (this.state.trashable) {
            return this.props.trashPhoto()
          }
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
                   left: state.offset.x,
                   top: state.offset.y,
                   transform: [
                     {scale: state.scale},
                   ],
                   zIndex: state.active ? 1 : 0,
                 }
               ]} />
    )
  }
}

const style = StyleSheet.create({

})
