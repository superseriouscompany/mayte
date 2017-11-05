import React, {Component}            from 'react'
import LinearGradient                from 'react-native-linear-gradient'
import ProfileView                   from './ProfileView'
import {
  screenWidth,
  screenHeight,
  matchHeaderHeight,
} from '../constants/dimensions'
import {
  profileOpen,
  profileClose,
  profileSwitch
} from '../constants/timings'
import {
  Animated,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

class MatchInfoView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      topValue:    new Animated.Value(screenHeight),
      heightValue: new Animated.Value(screenHeight * 0.3),
    }

    this.animateOpen   = this.animateOpen.bind(this)
    this.animateClosed = this.animateClosed.bind(this)
    this.animateSub    = this.animateSub.bind(this)
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.matchOpen && !this.props.matchOpen) {
      this.animateSub()
    } else if (!nextProps.matchOpen && this.props.matchOpen) {
      this.animateClosed()
    }

    if (nextProps.infoOpen && !this.props.infoOpen) {
      this.animateOpen()
    } else if (!nextProps.infoOpen && this.props.infoOpen) {
      this.animateSub()
    }
  }

  animateOpen() {
    Animated.parallel([
      Animated.timing(this.state.topValue, {
        toValue: matchHeaderHeight,
        duration: profileOpen,
      }),

      Animated.timing(this.state.heightValue, {
        toValue: screenHeight,
        duration: profileOpen,
      })
    ]).start()
  }

  animateSub() {
    Animated.parallel([
      Animated.timing(this.state.topValue, {
        toValue: screenHeight * 0.65,
        duration: profileSwitch,
      }),
      Animated.timing(this.state.heightValue, {
        toValue: screenHeight * 0.3,
        duration: profileSwitch,
      }),
    ]).start()
  }

  animateClosed() {
    Animated.parallel([
      Animated.timing(this.state.topValue, {
        toValue: screenHeight,
        duration: profileClose,
      }),
      Animated.timing(this.state.heightValue, {
        toValue: screenHeight * 0.3,
        duration: profileClose,
      })
    ]).start()
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
        <ProfileView user={props.user}
                     topValue={state.topValue}
                     heightValue={state.heightValue}
                     infoOpen={props.infoOpen}
                     showInfo={props.showInfo}
                     hideInfo={props.hideInfo}
                     hideButtons={true} />
      </Animated.View>
    )
  }
}

export default MatchInfoView

const style = StyleSheet.create({
  info: {
    position: 'absolute',
    width: '100%',
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
