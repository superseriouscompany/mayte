import React, {Component}            from 'react'
import moment                        from 'moment'
import LinearGradient                from 'react-native-linear-gradient'
import { screenWidth, screenHeight } from '../constants/dimensions'
import {
  Animated,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Linking,
  PanResponder,
} from 'react-native'

export default class ProfileView extends Component {
  constructor(props) {
    super(props)


    this.state = {
      topValue: new Animated.Value(screenHeight * 0.65),
      heightValue: new Animated.Value(screenHeight * 0.3),
    }

    this.animateOpen = this.animateOpen.bind(this)
    this.animateClosed = this.animateClosed.bind(this)

    this.linkToInstagram = this.linkToInstagram.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.infoOpen && !this.props.infoOpen) {
      this.animateOpen()
    } else if (!nextProps.infoOpen && this.props.infoOpen) {
      this.animateClosed()
    }
  }

  animateOpen() {
    Animated.parallel([
      Animated.timing(this.state.topValue, {
        toValue: 0,
        duration: 333,
      }),
      Animated.timing(this.state.heightValue, {
        toValue: screenHeight,
        duration: 333,
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

      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: profileOpen,
      })
    ]).start()
  }

  animateClosed() {
    Animated.parallel([
      Animated.timing(this.state.topValue, {
        toValue: screenHeight * 0.65,
        duration: 333,
      }),
      Animated.timing(this.state.heightValue, {
        toValue: screenHeight * 0.3,
        duration: 333,
      }),
    ]).start()
  }

  linkToInstagram(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.error(`can't handle url: ${url}`)
      } else {
        Linking.openURL(url)
      }
    })
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.panStartY = this.state.topValue._value
      },

      onPanResponderMove: (evt, gestureState) => {
        const newTop = this.panStartY + gestureState.dy
        this.setState({
          topValue: new Animated.Value(newTop),
          heightValue: new Animated.Value(screenHeight - newTop),
        })
      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        // if (this.props.infoOpen) {
          if (this.state.topValue._value < this.panStartY * 0.9) {
            console.log("keep me open")
            this.animateOpen()
          } else {
            this.animateClosed()
          }
        // } else {
        // }
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

    return(
      <Animated.View {...this._panResponder.panHandlers}
                     style={[{top: state.topValue, height: state.heightValue,}, style.info]}>
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
                        style={style.gradient}>
          <ScrollView style={style.content}
                      scrollEventThrottle={100}
                      onScroll={(e) => {
                        const {y} = e.nativeEvent.contentOffset
                        if (y < 0) {
                          props.hideInfo()
                        }
                      }}
                      scrollEnabled={props.infoOpen ? true : false}>
            <Text style={style.name}>
              {props.user.fullName.split(' ')[0]}, {props.user.dob ? moment().diff(props.user.dob, "years") : 25}
            </Text>
            <Text style={style.location}>
              {props.user.distance} miles away
            </Text>
            {
              props.hideButtons ? null :
              <View style={[style.tray]}>
                {
                  !props.infoOpen ?
                  <TouchableOpacity style={[style.opener]} onPress={() => props.showInfo()} />
                  :
                  null
                }
                <TouchableOpacity style={[style.bubble]} onPress={() => props.pass(props.user.id)} >
                  <Image style={style.icon}
                         resizeMode='contain'
                         source={require('../images/x.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={[style.bubble]} onPress={() => props.like(props.user.id)}>
                  <Image style={style.icon}
                         resizeMode='contain'
                         source={require('../images/heart.png')} />
                </TouchableOpacity>
              </View>
            }
            <View style={style.cv}>
              <Text style={style.handle}>{`${props.user.occupation || 'Profreshional Model, Treats'}`}!</Text>
              <TouchableOpacity onPress={() => this.linkToInstagram(`https:\/\/instagram.com/${props.user.instagramHandle || 'treatsmag'}`)}>
                <Text style={style.handle}>{`@${props.user.instagramHandle || 'treatsmag'}`}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={style.bio}>
    {props.user.bio || ``}
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
    </Animated.View>
    )
  }
}


const style = StyleSheet.create({
  info: {
    position: 'absolute',
    left: 0,
    width: '100%',
  },

  gradient: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    backgroundColor: 'transparent',
  },

  cv: {
    paddingTop: 30,
  },

  handle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    fontSize: 23,
  },

  bio: {
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    paddingTop: 40,
  },

  name: {
    top: 0, left: 0, right: 0,
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    fontSize: 25,
    paddingTop: 40,
  },

  location: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
  },

  tray: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 2,
  },

  bubble: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.125,
    borderRadius: screenWidth * 0.125,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  icon: {
    height: '60%',
    opacity: 0.8,
  },

  button: {
    color: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0)',
  },

  opener: {
    position: 'absolute',
    top: 10, left: 0,
    width: '100%',
    height: screenHeight * 0.25,
    zIndex: 1,
  },
})
