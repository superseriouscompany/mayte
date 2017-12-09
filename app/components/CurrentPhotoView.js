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
      offset: new Animated.ValueXY(props.targetPosition),
      scale: new Animated.Value(1),
      size: new Animated.Value(props.thumbWidth),
      trashable: false,
      active: false,
    }

    this.springToNewTarget = this.springToNewTarget.bind(this)
  }

  springToNewTarget(target) {
    Animated.spring(this.state.offset, {
      toValue: target
    }).start(() => this.setState({offset: new Animated.ValueXY(target)}))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.targetPosition != this.props.targetPosition) {
      this.springToNewTarget(this.props.targetPosition)
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.props.toggleActive()
        this.startX = this.props.targetPosition.x
        this.startY = this.props.targetPosition.y
        this.setState({
          active: true,
        })
      },

      onPanResponderMove: (evt, gestureState) => {
        const { pageX, pageY } = evt.nativeEvent
        const { trashX, trashY } = this.props.trashArea
        this.props.handleMovement(pageX, pageY)
        if (pageX >= trashX &&
            pageX <= trashX + this.props.trashArea.width &&
            pageY >= trashY &&
            pageY <= trashY + this.props.trashArea.height) {
          if (!this.state.trashable) {
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
        this.props.toggleActive()
        if (this.state.trashable) {
          return this.props.trashPhoto(this.props.photo)
        }
        Animated.spring(this.state.offset, {
          toValue: this.props.targetPosition
        }).start(() => this.setState({active: false}))
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
        <Animated.Image source={{uri: props.source}}
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
