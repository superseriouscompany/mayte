'use strict'

import React, {Component} from 'react'
import LinearGradient     from 'react-native-linear-gradient'
import transformUtil      from '../util/transform'
import QRCode             from 'react-native-qrcode'
import {mayteBlack}       from '../constants/colors'
import moment             from 'moment'
import api, {baseUrl}     from '../services/api'
import {ButtonBlack}      from './Button'
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
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
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

    const privacy = props.user.privacyOptions || {}
    const showAge = props.myProfile ?
      privacy.showAge && !!props.user.dob : !!props.user.dob
    const showLocation = props.myProfile ?
      privacy.showLocation && true : !!props.user.distance
    const showInstagramHandle = props.myProfile ?
      privacy.showInstagramHandle && !!props.user.instagramHandle : !!props.user.instagramHandle
    const showOccupation = props.myProfile ?
      privacy.showOccupation && !!props.user.occupation : !!props.user.occupation


    return(
      <Animated.ScrollView
        ref={n => this.node = n}
        scrollEventThrottle={100}
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
          style.content,
          {backgroundColor: 'transparent', overflow: 'visible'},
          {transform: [{translateY: this._y}]}
        ]}
        {...(state.contPermission ? this._panResponder.panHandlers: {})}>
        <View style={style.card}>
          <Image resizeMode="cover" source={{uri: props.user.photos[0].url}} style={style.mugshot}/>
          <View style={style.middleCnr}>
            <Text style={style.name}>{props.user.fullName}</Text>
            <Text style={style.since}>Member since:{"\n"}{moment(props.user.createdAt).format('MMMM Do YYYY')}</Text>
            <Text style={style.id}>{"\n"}Member ID:{"\n"} {props.user.id}</Text>
          </View>
          <View style={style.rightCnr}>
            <QRCode
              value={`${baseUrl}/member/${props.user.id}`}
              bgColor="hotpink"
              size={80}
              />
          </View>
        </View>

        { props.loading ?
          <View style={style.centered}>
            <ActivityIndicator size="large" />
          </View>
        :
          <TouchableOpacity style={style.addToWallet} onPress={props.addPass}>
            <Image resizeMode="contain" style={style.appleWalletLogo}
                   source={require('../images/add-to-apple-wallet-logo.png')} />
          </TouchableOpacity>
        }

        <View style={style.events}>
          <Text style={style.explanation}>
            This is your entry ticket to all Unicorn events.

            { !props.isGold ? null :
              <Text>
                {"\n"}As a brand ambassador, you are welcome to attend with a +1.
              </Text>
            }
          </Text>

          <Text style={style.nextEvent}>
            The next event is:
          </Text>
          <TouchableOpacity onPress={() => {}}>
            { /* TODO: pull title and description from the backend */ }
            <Text style={style.title}>
              Unicorn {"Valentine's"} Day.
            </Text>
            <Text style={style.description}>
              Feb 14 @ Absolut Elyx House
            </Text>
            <ButtonBlack style={style.inline} text="Details" onPress={() => {Linking.openURL('https://dateunicorn.com')}} />
          </TouchableOpacity>
        </View>
        <View style={style.buttonsCnr}>
          { props.isAdmin || props.isGold ?
            <ButtonBlack text={`VIP Codes`} onPress={props.visitVipCodeInvite} style={style.button} />
          : null }
        </View>
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
    paddingTop: notchHeight,
  },

  content: {
    width: '100%',
    height: fullHeight, // TEMP: prevent awkward overflow on spring
  },


  card: {
    flexDirection: 'row',
    width: em(20),
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: em(3),
    padding: em(1),
    marginBottom: em(1),
    marginTop: notchHeight,
  },
  mugshot: {
    aspectRatio: screenWidth / screenHeight,
    width: '20%',
    marginLeft: em(1),
    marginRight: em(1),
  },
  since: {
    fontSize: 12,
  },
  id: {
    fontSize: 12,
  },
  middleCnr: {
    flex: 1,
  },
  rightCnr: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  qrCode: {
    width: em(6),
    height: em(6),
  },
  appleWalletLogo: {
    height: 50,
  },
})