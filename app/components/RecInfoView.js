import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import ProfileView from './ProfileView'
import { screenWidth, screenHeight } from '../services/dimensions'
import {
  StyleSheet,
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

class RecInfoView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      topValue: new Animated.Value(screenHeight * 0.65),
      heightValue: new Animated.Value(screenHeight * 0.3),
    }

    this.animateOpen = this.animateOpen.bind(this)
    this.animateClosed = this.animateClosed.bind(this)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.infoOpen && !this.props.infoOpen) {
      this.animateOpen()
    } else if (!nextProps.infoOpen && this.props.infoOpen) {
      this.animateClosed()
    }
  }

  animateOpen() {
    Animated.timing(
      this.state.topValue,
      {
        toValue: 0,
        duration: 333,
      }
    ).start()
    Animated.timing(
      this.state.heightValue,
      {
        toValue: screenHeight,
        duration: 333,
      }
    ).start()
  }

  animateClosed() {
    Animated.timing(
      this.state.topValue,
      {
        toValue: screenHeight * 0.65,
        duration: 333,
      }
    ).start()
    Animated.timing(
      this.state.heightValue,
      {
        toValue: screenHeight * 0.3,
        duration: 333,
      }
    ).start()
  }

  render() {
    const {props, state} = this

    return (
      <Animated.View style={[{top: state.topValue, height: state.heightValue,}, style.info]}>
        {
          !props.infoOpen ?
          <TouchableOpacity style={style.opener} onPress={() => props.showInfo()} />
          :
          null
        }
        <ProfileView user={props.recs[props.index]}
                     like={props.like}
                     topValue={state.topValue}
                     heightValue={state.heightValue}
                     infoOpen={props.infoOpen}
                     hideInfo={props.hideInfo} />
      </Animated.View>
    )
  }
}

export default RecInfoView

const style = StyleSheet.create({
  info: {
    position: 'absolute',
  },

  opener: {
    position: 'absolute',
    bottom: 0, left: -20,
    width: screenWidth + 20,
    height: screenHeight * 0.25,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
})
