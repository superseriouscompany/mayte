import React, { Component } from 'react'
import { em, screenWidth } from '../constants/dimensions'
import CurrentPhotoView from '../components/CurrentPhotoView'
import {
  View,
  Image,
  Animated,
  StyleSheet,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native'

const thumbWidth = screenWidth * 0.1

export default class CurrentPhotos extends Component {
  constructor(props) {
    super(props)

    this.panHandlers = {}

    this.state = {
      cloneBin: this.props.photoBin,
      onSpring: null,
      targetPositions: this.calculateTargets(props.photoBin),
      newTargets: this.calculateTargets(props.photoBin),
      prevTargets: this.calculateTargets(props.photoBin),
    }
    this.calculateTargets = this.calculateTargets.bind(this)
    this.updateTargetPosition = this.updateTargetPosition.bind(this)
    this.handleMovement = this.handleMovement.bind(this)
    this.handleRelease = this.handleRelease.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.photoBin.length != this.props.photoBin.length) {
      this.setState({
        cloneBin: nextProps.photoBin,
        targetPositions: this.calculateTargets(nextProps.photoBin)
      })
    } else if (nextProps.photoBin !== this.state.cloneBin) {
      this.setState({
          onSpring: () => {
          this.setState({cloneBin: nextProps.photoBin, onSpring: null})
        }
      })
    }
  }

  calculateTargets(photos) {
    return photos.map((p,i) => {
      return {
        x: (thumbWidth + em(0.33)) * i,
        y: 0
      }
    })
  }

  handleMovement(pageX, pageY, picIndex) {
    var tp = this.state.targetPositions
    for (let i = 0; i < tp.length; i++) {
      if (pageX >= tp[i].x + em(1) &&
          pageX <= tp[i].x + thumbWidth + em(1) &&
          pageY >= this.contPageY &&
          pageY <= this.contPageY + thumbWidth) {

          // this.props.reorder(picIndex, i)
          // let state = this.state
          // // state.prevTargets[picIndex]
          // state.newTargets[i] = state.prevTargets[picIndex]
          // state.newTargets[picIndex] = state.prevTargets[picIndex] = tp[i]
          //
          // this.setState(state)
          //
          // this.isArranging = false
          break
      }
    }
  }

  handleRelease(pageX, pageY, picIndex) {
    var tp = this.state.targetPositions
    for (let i = 0; i < tp.length; i++) {
      if (pageX >= tp[i].x + em(1) &&
          pageX <= tp[i].x + thumbWidth + em(1) &&
          pageY >= this.contPageY &&
          pageY <= this.contPageY + thumbWidth) {

          this.props.reorder(picIndex, i)
          break
      }
    }
    this.props.toggleActive()
  }

  updateTargetPosition(index, target) {
    let state = this.state
    state.targetPositions[index] = target
    state.newTargets = null
    this.setState(state)
  }

  render() {
    const { props, state } = this
    return (
        <View style={[style.container]} ref={el => this.cont = el}
              onLayout={() => {
                this.cont.measure((x, y, width, height, pageX, pageY) => {
                  this.contPageY = pageY
                })
              }} >
        {
          state.cloneBin.map((p,i,a) => {
            const willBeMoved = props.toBeMoved === i
            const idx = props.photoBin.indexOf(p)
            return(
              <CurrentPhotoView key={idx}
                                idx={idx}
                                id={'abcdefghij'[idx]}
                                {...props}
                                source={p.url}
                                photo={p}
                                style={style.thumbnail}
                                willBeMoved={willBeMoved}
                                onSpring={
                                  () => {
                                    this.setState({cloneBin: props.photoBin})
                                  }
                                }
                                handleMovement={this.handleMovement}
                                handleRelease={this.handleRelease}
                                targetPosition={
                                  state.targetPositions[props.photoBin.indexOf(p)]
                                } />
            )
          })
        }
        </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'visible',
    height: thumbWidth,
  },
  thumbnail: {
    width: thumbWidth,
    height: thumbWidth,
    borderRadius: em(0.33),
    position: 'absolute',
  },
})
