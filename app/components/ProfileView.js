import React, {Component}                from 'react'
import moment                            from 'moment'
import LinearGradient                    from 'react-native-linear-gradient'
import { screenWidth, screenHeight, em } from '../constants/dimensions'
import {
  Animated,
  StyleSheet,
  ScrollView,
  FlatList,
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

  animateOpen(time) {
    Animated.parallel([
      Animated.timing(this.state.topValue, {
        toValue: 0,
        duration: time || 100,
      }),
      Animated.timing(this.state.heightValue, {
        toValue: screenHeight,
        duration: time || 100,
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
        duration: 100,
      }),
      Animated.timing(this.state.heightValue, {
        toValue: screenHeight * 0.3,
        duration: 100,
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
          if (this.state.topValue._value < this.panStartY * 0.9) {
            this.animateOpen()
          } else {
            this.animateClosed()
          }
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
    console.log(props.viewHeight)
    return(
      <View style={[style.container]}>
        <FlatList style={[style.container]}
                  onLayout={(e) => {
                    const {height} = e.nativeEvent.layout
                    return props.viewHeight ? null : props.setHeight(height)
                  }}
                  onScroll={(e) => {
                    const {contentOffset, layoutMeasurement, contentSize} = e.nativeEvent
                    if (contentOffset.y + layoutMeasurement.height > contentSize.height) {
                      e.preventDefault()
                      // console.log("bard")
                      // this.setState({infoOpen: true})
                      this.animateOpen()
                    }
                  }}
                  showsVerticalScrollIndicator={false}
                  pagingEnabled
                  data={props.user.photos || []}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) =>
                    <Image style={{width: screenWidth, height: props.viewHeight}}
                           resizeMode="cover"
                           source={{url: item.url}} />
                  } />
        <Animated.View style={[{top: state.topValue, height: state.heightValue,}, style.info]}>
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
                          style={style.gradient}>
            <ScrollView style={style.content}
                        {...this._panResponder.panHandlers}
                        scrollEventThrottle={100}

                        scrollEnabled={props.infoOpen ? true : false}>
              <Text style={style.name}>
                {props.user.fullName.split(' ')[0].toUpperCase()}
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={style.age}>
                  {props.user.dob ? moment().diff(props.user.dob, "years") : 25}
                </Text>
                <Image style={style.pin} resizeMode='contain' source={require('../images/pin.png')} />
                <Text style={style.location}>
                  {props.user.distance}
                </Text>
              </View>
              {
                props.hideButtons ? null :
                <View style={[style.tray]}>
                  <TouchableOpacity onPress={() => props.pass(props.user.id)} >
                    <Image style={style.bubble}
                           resizeMode='contain'
                           source={require('../images/nope-white.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.like(props.user.id)}>
                    <Image style={style.bubble}
                           resizeMode='contain'
                           source={require('../images/wink-white.png')} />
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
      </View>
    )
  }
}


const style = StyleSheet.create({
  container: {
    flex: 1,
  },

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
    fontSize: em(1.5),
    fontFamily: 'Gotham-Black',
    letterSpacing: em(0.1),
    paddingTop: 40,
  },

  age: {
    textAlign: 'center',
    fontSize: em(1.25),
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
  },

  pin: {
    width: em(1),
    height: em(1),
    marginLeft: em(0.66),
  },

  location: {
    textAlign: 'center',
    fontSize: em(1.25),
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
  },

  tray: {
    width: '100%',
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 2,
  },

  bubble: {
    width: screenWidth * 0.125,
    height: screenWidth * 0.125,
    opacity: 0.9,
    zIndex: 1,
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
