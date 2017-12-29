import React, {Component} from 'react'
import moment             from 'moment'
import LinearGradient     from 'react-native-linear-gradient'
import Icon               from 'react-native-vector-icons/Ionicons'
import { mayteBlack }     from '../constants/colors'

import {
  screenWidth,
  screenHeight,
  matchHeaderHeight,
  notchHeight,
  em,
} from '../constants/dimensions'
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

    this.infoClosedTop = screenHeight - notchHeight*2 -
                       ( props.hideButtons ?
                           props.myProfile ?
                             em(1) * 11.25 : em(1) * 11.25 + matchHeaderHeight + notchHeight :
                           em(1) * 15 )

    this._y = new Animated.Value(this.infoClosedTop)
    this._height = new Animated.Value(screenHeight * 0.3),

    this.state = {}

    this.animateOpen = this.animateOpen.bind(this)
    this.animateClosed = this.animateClosed.bind(this)
    this.linkToInstagram = this.linkToInstagram.bind(this)
  }

  animateOpen(time) {
    Animated.parallel([
      Animated.timing(this._y, {
        toValue: 0,
        duration: time || 100,
        // useNativeDriver: true,
      }),
      Animated.timing(this._height, {
        toValue: screenHeight,
        duration: time || 100,
      })
    ]).start()
  }


  animateSub() {
    Animated.parallel([
      Animated.timing(this._y, {
        toValue: this.infoClosedTop,
        duration: profileSwitch,
        // useNativeDriver: true,
      }),

      Animated.timing(this._height, {
        toValue: screenHeight * 0.3,
        duration: profileSwitch,
      }),

      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: profileOpen,
        // useNativeDriver: true,
      })
    ]).start()
  }

  animateClosed() {
    Animated.parallel([
      Animated.timing(this._y, {
        toValue: this.infoClosedTop,
        duration: 100,
        // useNativeDriver: true,
      }),
      Animated.timing(this._height, {
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
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // https://github.com/facebook/react-native/issues/3082
        if (gestureState.dx !== 0 || gestureState.dy !== 0) {
          return true
        }
        return false
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        this.panStartY = this._y._value
      },

      onPanResponderMove: (evt, gestureState) => {
        const newTop = this.panStartY + gestureState.dy
        Animated.parallel([
          Animated.timing(this._y, {
            toValue: newTop,
            duration: 0,
            // useNativeDriver: true,
          }),
          Animated.timing(this._height, {
            toValue: screenHeight - newTop,
            duration: 0,
          })
        ]).start()
      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
          if (this._y._value < this.panStartY * 0.9) {
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
    return(
      <View style={[style.container]}>
        <FlatList style={[style.container, {backgroundColor: mayteBlack()}]}
                  onLayout={(e) => {
                    const {height} = e.nativeEvent.layout
                    return props.viewHeight ? null : props.setHeight(height)
                  }}
                  onScroll={(e) => {
                    const {contentOffset, layoutMeasurement, contentSize} = e.nativeEvent
                    if (contentOffset.y + layoutMeasurement.height > contentSize.height) {
                      e.preventDefault()
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
        <Animated.View style={[{top: 0, height: this._height, transform: [{translateY: this._y}]}, style.info]}>
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                          style={style.gradient}>
            <ScrollView style={style.content}
                        {...this._panResponder.panHandlers}
                        scrollEventThrottle={100}

                        scrollEnabled={props.infoOpen ? true : false}>
              <Text style={style.name}>
                {props.user.fullName.split(' ')[0].toUpperCase()}
              </Text>
              <View style={[style.stats, {paddingBottom: props.hideButtons ? em(1) : 0}]}>
                <Text style={style.age}>
                  {props.user.dob ? moment().diff(moment(props.user.dob, ['MMM Do YYYY']), 'years') : 25}
                </Text>
                <Image style={style.pin} resizeMode='contain' source={require('../images/pin.png')} />
                <Text style={style.location}>
                  {props.user.distance || 1}
                </Text>
              </View>
              {
                props.hideButtons ? null :
                <View style={[style.tray]}>
                  <TouchableOpacity onPress={() => props.pass(props.user.id)}>
                    <Image style={style.bubble}
                           resizeMode='contain'
                           source={require('../images/x-white.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.like(props.user.id)}>
                    <Image style={style.bubble}
                           resizeMode='contain'
                           source={require('../images/heart-white.png')} />
                  </TouchableOpacity>
                </View>
              }
              <View style={style.cv}>
                <TouchableOpacity onPress={() => this.linkToInstagram(`https:\/\/instagram.com/${props.user.instagramHandle || 'treatsmag'}`)}>
                  <Text style={style.handle}>@{props.user.instagramHandle || 'treatsmag'}</Text>
                </TouchableOpacity>
                <Text style={style.occupation}>{(props.user.occupation || 'Model').toUpperCase()}</Text>
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
    paddingTop: notchHeight,
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
    marginBottom: em(0.33),
    fontSize: em(1.66),
    letterSpacing: em(0.1),
    fontFamily: 'Gotham-Book',
  },

  occupation: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    fontSize: em(1.33),
    letterSpacing: em(0.1),
    fontFamily: 'Gotham-Black',
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

  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    marginTop: em(0.1),
  },

  location: {
    textAlign: 'center',
    fontSize: em(1.25),
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
  },

  tray: {
    width: '100%',
    paddingTop: em(1),
    paddingBottom: em(1),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 2,
  },

  bubble: {
    width: em(2),
    height: em(2),
    opacity: 0.9,
    zIndex: 1,
  },

  button: {
    color: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0)',
  },

  decideButton: {
    color: 'white',
  },
})
