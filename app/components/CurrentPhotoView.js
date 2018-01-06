import React, { Component } from 'react'
import { em, screenWidth } from '../constants/dimensions'
import {
  Image,
  Animated,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'

export default class CurrentPhotoView extends Component {
  constructor(props) {
    super(props)

    this._offset = new Animated.ValueXY(props.targetPosition)
    this._scale = new Animated.Value(1)
    this._rotation = new Animated.Value(0)
    this.wiggleLoop = null

    this.state = {
      trashable: false,
      active: false,
    }

    this.springToNewTarget = this.springToNewTarget.bind(this)
    this.startWiggle = this.startWiggle.bind(this)
    this.stopWiggle = this.stopWiggle.bind(this)
  }

  springToNewTarget(target) {
    if (this.state.active) {return}
    Animated.spring(this._offset, {
      toValue: target,
      stiffness: 250,
      overshootClamping: true,
    }).start(() => {
      if (this.state.active) {this.props.onSpring()}
      this.setState({
        offset: new Animated.ValueXY(target),
        active: false,
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.targetPosition != this.props.targetPosition) {
      // if (!this.state.active) {
        this.springToNewTarget(nextProps.targetPosition)
      // }
    }

    if (nextProps.editing && !this.props.editing) {
      this.startWiggle()
    } else if (!nextProps.editing && this.props.editing) {
      this.stopWiggle()
    }
  }

  startWiggle() {
    this.wiggleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(this._rotation, {
          toValue: -1,
          duration: 100,
          // useNativeDriver: true,
        }),
        Animated.timing(this._rotation, {
          toValue: 1,
          duration: 100,
          // useNativeDriver: true,
        })
      ])
    )
    this.wiggleLoop.start()
  }

  stopWiggle() {
    this.wiggleLoop.stop()
    Animated.timing(this._rotation, {
      toValue: 0,
      duration: 0,
      // useNativeDriver: true,
    }).start(() => this.wiggleLoop = null)
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (this.props.editing) {return false}
        return true
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        this.props.toggleActive(true)
        this.startX = this.props.targetPosition.x
        this.startY = this.props.targetPosition.y
        this.setState({
          active: true,
        })

        // if (this.props.willBeMoved) {
        //   return this.props.setToBeMoved(null)
        // }
        // if (this.props.toBeMoved !== null && !this.props.willBeMoved) {
        //   return this.props.reorder(this.props.toBeMoved, this.props.idx)
        // }
        // return this.props.setToBeMoved(this.props.idx)
      },

      onPanResponderMove: (evt, gestureState) => {
        const { pageX: px, pageY: py } = evt.nativeEvent
        const { pageX: tx, pageY: ty } = this.props.trashArea
        this.props.handleMovement(px, py, this.props.idx)
        if (px >= tx &&
            px <= tx + this.props.trashArea.width &&
            py >= ty &&
            py <= ty + this.props.trashArea.height) {
          if (!this.state.trashable) {
            this.setState({trashable: true})
            this.props.toggleTrashReady(true)
            Animated.timing(this._scale, {toValue: 0, duration: 500}).start()
          }
        } else if (this.state.trashable) {
          this.setState({trashable: false})
          Animated.timing(this._scale, {toValue: 1, duration: 500}).start()
          this.props.toggleTrashReady(false)
        }

        Animated.spring(this._offset, {
          toValue: {
            x: this.startX + gestureState.dx,
            y: this.startY + gestureState.dy,
          }
        }).start()

      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        const { pageX: px, pageY: py } = evt.nativeEvent
        const { pageX: tx, pageY: ty } = this.props.trashArea
        //
        // console.log("release me", px, py, this.props.idx)
        if (this.state.trashable) {
          this.props.trashPhoto(this.props.photo)
          this._scale = new Animated.Value(1)
        }

        this.props.handleRelease(px, py, this.props.idx)

        Animated.spring(this._offset, {
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
    const interpolatedWiggle = this._rotation.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg']
    })
    return (
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[
            {
              left:this._offset.x,
              top:this._offset.y,
              transform: [
                {scale:this._scale},
                {rotate:interpolatedWiggle}
              ],
              zIndex: state.active ? 1 : 0,
              borderColor: 'red',
              borderWidth: props.willBeMoved ? 1 : 0,
            }
          ]}>
          <TouchableOpacity
            onPress={props.editing ?
              () => props.editPhoto({url: props.source}) : () => null} >
            <Image source={{uri: props.source}} style={[props.style]} />
          </TouchableOpacity>
        </Animated.View>
    )
  }
}

const style = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  }
})
