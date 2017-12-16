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
      targetPositions: this.calculateTargets(props.photoBin),
      newTargets: this.calculateTargets(props.photoBin),
      prevTargets: this.calculateTargets(props.photoBin),
    }
    this.calculateTargets = this.calculateTargets.bind(this)
    this.updateTargetPosition = this.updateTargetPosition.bind(this)
    this.trashPhoto = this.trashPhoto.bind(this)
    this.handleMovement = this.handleMovement.bind(this)
  }

  componentWillUpdate(nextProps) {
    // this.bindPanResponders()
    if (nextProps.photoBin.length != this.props.photoBin.length) {
      console.log("NEW BIN ALURT")
      this.setState({targetPositions: this.calculateTargets(nextProps.photoBin)})
    }
  }

  componentDidMount() {
    // this.setState({
    //   newTargets: tp.map((pos,i) => {
    //     return tp[tp.length - i - 1]
    //   })
    // })
  }

  trashPhoto(p) {
    // console.log("TRASH", p.url)
    const state = this.state
    const idx = state.photos.indexOf(p)
    state.photos.splice(idx, 1)
    // props.setUser({...props.user, photos})
    state.targetPositions = this.calculateTargets(state.photos)
    this.setState(state)
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
    // console.log(pageX, pageY)
    var tp = this.state.targetPositions
    for (let i = 0; i < tp.length; i++) {
      if (pageX >= tp[i].x &&
          pageX <= tp[i].x + thumbWidth &&
          pageY >= this.contPageY &&
          pageY <= this.contPageY + thumbWidth) {

          let state = this.state
          // state.prevTargets[picIndex]
          state.newTargets[i] = state.prevTargets[picIndex]
          state.newTargets[picIndex] = state.prevTargets[picIndex] = tp[i]

          this.setState(state)

          this.isArranging = false
          break
      }
    }
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
          props.photoBin.map((p,i,a) => {
            return(
              <CurrentPhotoView key={i}
                                idx={i}
                                {...props}
                                source={p.uri}
                                photo={p}
                                style={style.thumbnail}
                                willBeMoved={props.toBeMoved === i}
                                handleMovement={this.handleMovement}
                                targetPositions={state.targetPositions}
                                targetPosition={
                                  state.targetPositions[props.photoBin.indexOf(p)]
                                }
                                // targetPosition={ (state.newTargets || [])[i] || state.targetPositions[i] }
                                updateTargetPosition={this.updateTargetPosition} />
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
