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
    this.state = {
      active: false,
      flip: false,
    }
    this.flip = this.flip.bind(this)
  }

  flip() {
    this.setState({flip:!this.state.flip})
  }

  render() {
    const { props, state } = this
    return (
      <TouchableWithoutFeedback onPress={this.flip}>
        <View style={[style.container]}>
        {
          props.photos.map((p,i,a) => {
            return(
              <CurrentPhotoView key={i}
                                idx={state.flip ? a.length - 1 - i : i}
                                photo={p}
                                {...state}
                                targetPositions={a.map(() => { return {x: (thumbWidth + em(0.33)) * i, y: 0} }) }
                                toggleActive={props.toggleActive}
                                active={props.active}
                                style={style.thumbnail}
                                thumbWidth={thumbWidth} />
            )
          })
        }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    zIndex: 1,
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
