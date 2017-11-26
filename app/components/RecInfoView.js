import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import ProfileView from './ProfileView'
import { screenWidth, screenHeight } from '../constants/dimensions'
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.infoOpen && !this.props.infoOpen) {
      this.animateOpen()
    } else if (!nextProps.infoOpen && this.props.infoOpen) {
      this.animateClosed()
    }
  }

  render() {
    const {props, state} = this

    return (
      <Animated.View style={[{top: state.topValue, height: state.heightValue,}, style.info]}>
        <ProfileView user={props.rec}
                     pass={props.pass}
                     like={props.like}
                     topValue={state.topValue}
                     heightValue={state.heightValue}
                     infoOpen={props.infoOpen}
                     showInfo={props.showInfo}
                     hideInfo={props.hideInfo} />
      </Animated.View>
    )
  }
}

export default RecInfoView

const style = StyleSheet.create({
  info: {
    position: 'absolute',
    left: -screenWidth * 0.038, // TEMP: not sure what's happening with this offset
  },
})
