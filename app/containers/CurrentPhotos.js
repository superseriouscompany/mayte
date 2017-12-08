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
      active: false,
      targetPositions: this.calculateTargets(props.photoBin),
    }
    this.calculateTargets = this.calculateTargets.bind(this)
    this.trashPhoto = this.trashPhoto.bind(this)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.photos.length != this.state.photos.length) {
  //     this.setState({
  //       photos: nextProps.photos,
  //       targetPositions: this.calculateTargets(nextProps.photos)
  //     })
  //   }
  // }

  componentDidUpdate() {
    // this.bindPanResponders()
  }

  componentDidMount() {
    // this.setState({
    //   photos: this.props.photos.map(p => {console.log(p.url); return p.url}),
    //   targetPositions: this.calculateTargets(this.props.photos)
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
      return {x: (thumbWidth + em(0.33)) * i, y: 0}
    })
  }

  handleMovement() {

  }

  render() {
    const { props, state } = this
    return (
        <View style={[style.container]}>
        {
          props.photoBin.map((p,i,a) => {
            return(
              <CurrentPhotoView key={i}
                                source={p}
                                {...props}
                                style={style.thumbnail}
                                targetPosition={ state.targetPositions[i] } />
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
