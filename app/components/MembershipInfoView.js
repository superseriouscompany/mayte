'use strict'

import React, {Component}       from 'react'
import LinearGradient           from 'react-native-linear-gradient'
import transformUtil            from '../util/transform'
import QRCode                   from 'react-native-qrcode'
import {mayteBlack, mayteWhite} from '../constants/colors'
import moment                   from 'moment'
import api, {baseUrl}           from '../services/api'
import {ButtonBlack}            from './Button'
import {
  em,
  screenWidth,
  screenHeight,
  notchHeight,
  tabNavHeight,
  bottomBoost,
  matchHeaderHeight,
} from '../constants/dimensions'
import {
  ActivityIndicator,
  Animated,
  PanResponder,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

const fullHeight = screenHeight - tabNavHeight - bottomBoost

export default class MembershipInfoView extends Component {
  constructor(props) {
    super(props)

    this.infoOpenTop   = 0
    this.infoClosedTop = screenHeight

    this._y = new Animated.Value(this.infoClosedTop)
    this._height = new Animated.Value(this.computeHeight(this.infoClosedTop))
    this._opacity = new Animated.Value(1),
    this.state = {
      interacting: false,
      contPermission: true,
      scrollEnabled: false,
    }

    this.animateTo = this.animateTo.bind(this)
    this.animateOpen = this.animateOpen.bind(this)
    this.animateClosed = this.animateClosed.bind(this)
    this.forceOpen = this.forceOpen.bind(this)
  }

  computeScale(top) {
    const base = screenHeight - tabNavHeight - bottomBoost
    return (base - top) / base
  }

  computeHeight(top) {
    return screenHeight - top - tabNavHeight - bottomBoost
  }

  forceOpen() {
    this.animateOpen()
  }

  animateTo(loc) {
    if (!this.props.mask) {
      this.props.maskOn()
    }
    if (loc < this.infoClosedTop) {
      this.props.incrementMask(1 - loc / this.infoClosedTop)
    }
    Animated.timing(this._y, {
      toValue: loc,
      duration: 0,
      useNativeDriver: true,
    }).start()
  }

  animateOpen() {
    this.props.setOpen(true)
    this.setState({scrollEnabled: true})

    if (!this.props.mask) {
      this.props.maskOn()
    }
    this.props.fadeInMask()
    Animated.spring(this._y, {
      toValue: this.infoOpenTop,
      velocity: 200,
      useNativeDriver: true,
    }).start()
  }

  animateSub() {
    Animated.timing(this._y, {
      toValue: this.infoClosedTop,
      duration: profileSwitch,
      useNativeDriver: true,
    }).start()
  }

  animateClosed() {
    this.props.setOpen(false)
    this.node._component.scrollTo({y:0, animated: true})
    this.setState({scrollEnabled: false})

    this.props.fadeOutMask()
    Animated.spring(this._y, {
      toValue: this.infoClosedTop,
      velocity: 200,
      useNativeDriver: true,
    }).start()
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (gestureState.dx !== 0 || gestureState.dy !== 0) {
          return true
        }
        return false
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({interacting: true})
        this._panStartY = this.props.open ? this.infoOpenTop : this.infoClosedTop
      },

      onPanResponderMove: (evt, gestureState) => {
        this.newY = Math.max(this._panStartY + gestureState.dy, 0)
        this.animateTo(this.newY)
      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        this._y = new Animated.Value(this.newY)
        this.setState({interacting: false})
        if (this.newY > this._panStartY + 50) {
          this.animateClosed()
        } else if (this.newY < this._panStartY - 50) {
          this.animateOpen()
        } else {
          this.props.open ? this.animateOpen() : this.animateClosed()
        }
      },

      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  }

  flushTransform(ref, y) {
    const matrix = transformUtil.scaleY(this.computeScale(y))
    transformUtil.origin(matrix,{x: 0, y: -(this.computeHeight(0)/2), z: 0})
    ref.setNativeProps({
      style: {
        transform: [
          {scaleY: 0.5},
          {matrix}
        ]
      }
    })
  }

  render() {
    const {props,state} = this

    return(
      <Animated.ScrollView
        ref={n => this.node = n}
        scrollEventThrottle={100}
        showsVerticalScrollIndicator={false}
        bounces={true}
        scrollEnabled={state.scrollEnabled}
        onMomentumScrollBegin={(e) => {
          const {contentOffset} = e.nativeEvent
          if (contentOffset.y < 0 && state.contPermission) {
            this.animateClosed()
          }
        }}
        onScroll={(e) => {
          const {contentOffset} = e.nativeEvent
          if (contentOffset.y > 0 && state.contPermission) {
            this.setState({contPermission: false})
          }
          if (contentOffset.y <= 0 && !state.contPermission) {
            this.setState({contPermission: true})
          }
        }}
        style={[
          style.container,
          {backgroundColor: 'transparent', overflow: 'visible'},
          {transform: [{translateY: this._y}]}
        ]}
        contentContainerStyle={style.content}
        {...(state.contPermission ? this._panResponder.panHandlers: {})}>

        { !props.myEvents[0] ? null :
          <View style={style.nextEvent}>
            <Text style={[style.nextEventText]}>Next Event:</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Event', {eventId: props.myEvents[0].id})}>
              <Text style={[style.nextEventText, style.nextEventTitle]}>{props.myEvents[0].title}</Text>
            </TouchableOpacity>
          </View> }

        <View style={style.header}>
          <View style={style.headerPri}>
            <Image resizeMove="cover" source={{uri: props.user.photos[0].url}} style={style.mugshot}/>
            <Text style={style.name} adjustsFontSizeToFit={true}>
              {props.user.fullName}
            </Text>
          </View>

          <View style={style.headerSub}>
            <Text style={style.since}>
              <Text style={{fontWeight: '700'}}>Member since:</Text>{"\n"}{moment(props.user.createdAt).format('MMMM Do YYYY')}
            </Text>
            <Text style={style.id}>
              <Text style={{fontWeight: '700'}}>Member ID:</Text>{"\n"} {props.user.id}
            </Text>
          </View>
        </View>

        <View style={style.qrCont}>
          <QRCode
            value={`${baseUrl}/member/${props.user.id}`}
            bgColor={mayteWhite()}
            fgColor={mayteBlack()}
            size={screenWidth * 0.84}
            />
        </View>

        <Text style={style.explanation}>
          This is your entry ticket to all Unicorn events.{ !props.isGold ? null :
            <Text> As a brand ambassador, you are welcome to attend with a +1.</Text>
          }
        </Text>

        <TouchableOpacity style={style.addToWallet} onPress={props.addPass}>
          <Image resizeMode="contain" style={style.appleWalletLogo}
                 source={require('../images/add-to-apple-wallet-logo.png')} />
        </TouchableOpacity>

        { props.events.length ?
          <View style={style.upcomingEvent}>
            <Text style={[style.eventText, style.eventHeader]}>Upcoming Event{props.events.length > 1 ? 's' : ''}:</Text>
            { props.events.map((e, key) => (
              <TouchableOpacity onPress={() => Linking.openURL(e.url)} key={key}>
                <Text style={[style.eventText, style.eventTitle]}>{e.title}</Text>
                <Text style={[style.eventText]}>{e.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        : props.eventsLoading ?
          <ActivityIndicator />
        : props.eventsFailed ?
          <TouchableOpacity style={style.upcomingEvent} onPress={props.loadEvents}>
            <Text style={style.eventText}>Events failed to load. Tap to retry.</Text>
          </TouchableOpacity>
        : null
        }
      </Animated.ScrollView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    width: '100%',
    paddingTop: notchHeight + em(2),
    paddingLeft: screenWidth * 0.08,
    paddingRight: screenWidth * 0.08,
    width: '100%',
    height: fullHeight, // TEMP: prevent awkward overflow on spring
  },

  content: {alignItems: 'center',},

  nextEvent: {marginBottom: em(2)},
  nextEventText: {color: mayteWhite(),textAlign: 'center',},
  nextEventTitle: {textDecorationLine: 'underline',},

  header: {
  },
  headerPri: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: em(1.66),
    width: '100%',
  },
  mugshot: {
    width: em(5),
    height: em(5),
    borderRadius: em(2.5),
    marginRight: em(1),
  },
  name: {
    fontFamily: 'Futura',
    color: mayteWhite(),
    letterSpacing: em(0.1),
    textAlign: 'center',
    fontSize: em(2),
    height: '100%',
    flex: 1,
  },
  headerSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: em(1.66),
  },
  since: {
    fontSize: em(0.8),
    textAlign: 'left',
    color: mayteWhite(),
    fontFamily: 'Futura',
  },
  id: {
    fontSize: em(0.8),
    textAlign: 'right',
    color: mayteWhite(),
    fontFamily: 'Futura',
  },
  qrCont: {
    marginBottom: em(2),

  },
  explanation: {
    color: mayteWhite(),
    textAlign: 'center',
    fontSize: em(1),
    fontFamily: 'Futura',
    marginBottom: em(1.66),
    width: '90%',
  },
  addToWallet: {
    alignItems: 'center',
    marginBottom: em(2),
  },
  appleWalletLogo: {
    height: em(3),
  },

  upcomingEvent: {
    paddingBottom: em(3) + bottomBoost,
  },
  eventText: {
    textAlign: 'center',
    fontFamily: 'futura',
    color: mayteWhite(),
    fontSize: em(1),
  },
  eventHeader: {
  },
  eventTitle: {
    marginTop: em(1),
    fontWeight: '700',
  }
})
