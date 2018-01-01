'use strict'

import React, {Component} from 'react'
import LinearGradient     from 'react-native-linear-gradient'
import transformUtil      from '../util/transform'
import {mayteBlack}       from '../constants/colors'
import moment             from 'moment'
import {
  em,
  screenHeight,
  notchHeight,
  tabNavHeight,
  bottomBoost,
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

export default class ProfileInfoView extends Component {
  constructor(props) {
    super(props)

    this.infoOpenTop   = 0
    this.infoClosedTop = screenHeight - notchHeight*2 -
                       ( props.hideButtons ?
                           props.myProfile ?
                             em(1) * 11.25 : em(1) * 11.25 + matchHeaderHeight + notchHeight :
                           em(1) * 15 )

    this._dynamicY = new Animated.Value(this.infoClosedTop) // THIS IS HACKY AS FUCK
    this._staticY = new Animated.Value(this.infoClosedTop)
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
  }

  computeScale(top) {
    const base = screenHeight - tabNavHeight - bottomBoost
    return (base - top) / base
  }

  computeHeight(top) {
    return screenHeight - top - tabNavHeight - bottomBoost
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.open && !this.props.open) {
  //     this.animateOpen()
  //   }
  //   if (!nextProps.open && this.props.open) {
  //     this.animateClosed()
  //   }
  // }

  animateTo(loc) {
    Animated.timing(this._dynamicY, {
      toValue: loc,
      duration: 0,
    }).start()
  }

  animateOpen() {
    this.props.setOpen(true)
    this.setState({scrollEnabled: true})
    this._dynamicY = new Animated.Value(this.infoOpenTop)
    Animated.parallel([
      Animated.spring(this._staticY, {
        toValue: this.infoOpenTop,
        velocity: 200,
        useNativeDriver: true,
      }),
      Animated.spring(this._height, {
        toValue: this.computeHeight(0),
        velocity: 200,
        overshootClamping: true,
      })
    ]).start()
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
    // this._dynamicY = new Animated.Value(this.infoClosedTop)
    Animated.parallel([
      Animated.spring(this._dynamicY, {
        toValue: this.infoClosedTop,
        velocity: 200,
      }),
      Animated.spring(this._staticY, {
        toValue: this.infoClosedTop,
        velocity: 200,
        useNativeDriver: true,
      }),
      Animated.spring(this._height, {
        toValue: this.computeHeight(this.infoClosedTop),
        velocity: 200,
        overshootClamping: true,
      })
    ]).start()
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
        this._panStartY = this._dynamicY._value
      },

      onPanResponderMove: (evt, gestureState) => {
        this.newY = Math.max(this._panStartY + gestureState.dy, 0)
        this.animateTo(this.newY)
      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        this._staticY = new Animated.Value(this.newY)
        this.setState({interacting: false})
        if (this.newY > this._panStartY + 50) {
          console.log("FORKS")
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
          {backgroundColor: mayteBlack(0.33), overflow: 'visible'},
          {transform: [{translateY: state.interacting ? this._dynamicY : this._staticY}]}
        ]}
        {...(state.contPermission ? this._panResponder.panHandlers: {})}>
        <Text style={style.name}>
          {props.user.fullName.split(' ')[0].toUpperCase()}
        </Text>
        <View style={[style.stats, {paddingBottom: props.hideButtons ? em(1) : 0}]}>
          {
            props.user.dob ?
            <Text style={style.age}>
              {moment().diff(moment(props.user.dob, ['MMM Do YYYY']), 'years')}
            </Text> : null
          }
          <Image style={[style.pin, {marginLeft: props.user.dob ? em(0.66) : 0}]} resizeMode='contain' source={require('../images/pin.png')} />
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
                     source={require('../images/unicorn-white.png')} />
            </TouchableOpacity>
          </View>
        }
        <View style={style.cv}>
          <TouchableOpacity onPress={() => props.linkToInstagram(`https:\/\/instagram.com/${props.user.instagramHandle || 'treatsmag'}`)}>
          { props.user.instagramHandle ?
            <Text
              style={[
                style.handle,
                (props.user.instagramHandle.length > 15 ? {
                  fontSize: screenWidth / props.user.instagramHandle.length * 1.2
                } : {})
              ]}>
              @{props.user.instagramHandle}
            </Text> : null }
          </TouchableOpacity>
          { props.user.occupation ?
            <Text
              style={[
                style.occupation,
                (props.user.occupation.length > 15 ? {
                  fontSize: screenWidth / props.user.occupation.length * 1.2
                } : {})
              ]}>
              {(props.user.occupation).toUpperCase()}
            </Text> : null }
        </View>
        <View>
          <Text style={style.bio}>
            {props.user.bio || `Lorem ipsum dolor amet banjo letterpress gluten-free deep v shaman mixtape waistcoat vaporware fanny pack jianbing williamsburg cray godard you probably haven't heard of them. Squid umami street art offal pour-over. Post-ironic irony farm-to-table art party gluten-free, pitchfork keytar truffaut messenger bag jianbing chartreuse cray. Synth try-hard brunch retro. Yuccie brooklyn irony four dollar toast butcher cred flannel green juice XOXO franzen unicorn meggings fixie skateboard.

  Post-ironic echo park wolf, gentrify hexagon aesthetic microdosing pabst XOXO single-origin coffee swag bicycle rights. Chartreuse shaman next level organic copper mug roof party before they sold out portland quinoa adaptogen hammock butcher 8-bit biodiesel squid. Kickstarter craft beer iPhone authentic tousled. Microdosing direct trade hella coloring book taiyaki venmo normcore shaman wolf master cleanse affogato tattooed. Hexagon viral whatever meditation, vape austin offal williamsburg shoreditch. Cardigan sriracha fanny pack enamel pin VHS semiotics prism vice single-origin coffee letterpress intelligentsia. Tote bag fanny pack bushwick chicharrones beard vinyl XOXO stumptown ramps cloud bread you probably haven't heard of them. Tacos normcore chartreuse migas vice, jianbing tote bag tofu vaporware sustainable poutine waistcoat XOXO roof party af.

Tousled craft beer ennui, live-edge literally locavore squid waistcoat farm-to-table echo park skateboard tacos readymade 3 wolf moon taiyaki. Bitters photo booth live-edge cornhole, chambray banh mi hammock polaroid pitchfork lo-fi dreamcatcher literally. Before they sold out gentrify semiotics kale chips affogato migas sartorial bitters pabst tote bag williamsburg paleo. Wolf retro blog occupy letterpress ugh direct trade mustache edison bulb lo-fi humblebrag pitchfork. YOLO you probably haven't heard of them asymmetrical aesthetic street art. Blog palo santo coloring book sriracha mumblecore asymmetrical gochujang gentrify la croix. Hell of tattooed normcore YOLO schlitz lumbersexual cronut tbh put a bird on it man bun viral edison bulb shabby chic kitsch 8-bit.`}
          </Text>
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
    paddingLeft: em(1),
    paddingRight: em(1),
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
    paddingBottom: tabNavHeight + bottomBoost,
  },

  name: {
    top: 0, left: 0, right: 0,
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    fontSize: em(1.5),
    fontFamily: 'Futura',
    fontWeight: '700',
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
    width: em(3),
    height: em(3),
    opacity: 0.9,
    zIndex: 1,
  },

  button: {
    color: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0)',
  },

  content: {
    width: '100%',
    height: fullHeight, // TEMP: prevent awkward overflow on spring
  },
})
