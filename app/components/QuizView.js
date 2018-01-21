import React, {Component}              from 'react'
import {KeyboardAwareScrollView}       from 'react-native-keyboard-aware-scroll-view'
import LinearGradient                  from 'react-native-linear-gradient'
import {StaticNight, Star, StarSystem} from './Environment'
import Intro                           from './QuizIntroView'
import Email                           from './QuizEmailView'
import Dob                             from './QuizDobView'
import Website                         from './QuizWebsiteView'
import Photos                          from './QuizPhotosView'
import Freeform                        from './QuizFreeformView'
import Review                          from './QuizReviewView'
import Firework                        from './Firework'
import {mayteWhite}                    from '../constants/colors'
import {ButtonGrey}                    from './Button'
import timing                          from '../constants/timing'
import {
  em,
  screenWidth,
  tabNavHeight,
  screenHeight,
  bottomBoost
} from '../constants/dimensions'
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class QuizView extends Component {
  constructor(props) {
    super(props)
    this._zodiacOpacity = new Animated.Value(0)
    this._zodiacScale = new Animated.Value(0)
  }

  componentWillReceiveProps(props) {
    if( props.zodiac && !this.props.zodiac ) {
      Animated.parallel([
        Animated.spring(this._zodiacScale, {
          toValue: 0.66,
          stiffness: 250,
          useNativeDriver: true,
        }),
        Animated.timing(this._zodiacOpacity, {
          toValue: 0.66,
          duration: timing.zodiacInDuration,
          useNativeDriver: true,
        })
      ]).start()
    }
  }

  renderZodiac() {
    if (!this.props.zodiac) {return null }
    return <Animated.Image
              style={[
                style.zodiac,
                {
                  opacity: this._zodiacOpacity,
                  transform: [{scale: this._zodiacScale}, {rotate: '15deg'}]}]
                }
                source={zodiacImage(this.props.zodiac)}
                resizeMode='contain'  />
  }

  render() {
    const {props, state} = this
    const rfs = props.readyForSubmit
    return(
      <View style={style.container}>
        <StaticNight style={style.bg}>
          <Star style={{top: em(2), left: em(2)}} twinkleDelay={2000} />
          <Star style={{top: em(10), left: em(10)}} twinkleDelay={2800} />
          <Star style={{top: em(20), left: em(15)}} twinkleDelay={3300} />
          <Star style={{top: em(15), left: em(20)}} twinkleDelay={4500} />
          <Star style={{top: em(23), left: em(2)}} twinkleDelay={5300} />
          <Star style={{top: em(2), left: em(2)}} twinkleDelay={6200} />
          <Star style={{top: screenHeight * 0.64, left: em(18)}} twinkleDelay={6800} />
          <Star style={{bottom: em(2), right: em(2)}} twinkleDelay={21000} />
          <Star style={{bottom: em(10), right: em(10)}} twinkleDelay={21800} />
          <Star style={{bottom: em(15), right: em(20)}} twinkleDelay={41500} />
          <Star style={{bottom: em(23), right: em(2)}} twinkleDelay={51300} />
          <Star style={{bottom: em(2), right: em(2)}} twinkleDelay={61200} />
          <Star style={{top: screenHeight * 0.64, right: em(18)}} twinkleDelay={61800} />

          <StarSystem count={30} loopLength={120000} starProps={{size: 0.66, twinkle: false, style: {opacity: 0.66}}}></StarSystem>
          <StarSystem count={50} starProps={{size: 0.33, twinkle: false, style: {opacity: 0.33}}}></StarSystem>

          {
            this.renderZodiac()
          }
        </StaticNight>

        <Intro {...props} next={() => props.update({step: rfs ? 'review' : 'email'})} />
        <Email {...props} next={() => props.update({step: rfs ? 'review' : 'dob'})} />
        <Dob {...props} next={() => props.update({step: rfs ? 'review' : 'website'})} updateDob={props.updateDob} />
        <Website {...props} next={() => props.update({step: rfs ? 'review' : 'photos'})} />
        <Photos {...props} next={() => props.update({step: rfs ? 'review' : 'freeform'})} />
        <Freeform {...props} next={() => props.update({step: rfs ? 'review' : 'review'})} />
        <Review {...props} />
      </View>
    )
  }
}

function zodiacImage(zodiac) {
  switch(zodiac) {
    case 'aquarius': return require('../images/zodiac-aquarius-white.png')
    case 'aries': return require('../images/zodiac-aries-white.png')
    case 'cancer': return require('../images/zodiac-cancer-white.png')
    case 'capricorn': return require('../images/zodiac-capricorn-white.png')
    case 'gemini': return require('../images/zodiac-gemini-white.png')
    case 'leo': return require('../images/zodiac-leo-white.png')
    case 'libra': return require('../images/zodiac-libra-white.png')
    case 'pisces': return require('../images/zodiac-pisces-white.png')
    case 'sagittarius': return require('../images/zodiac-sagittarius-white.png')
    case 'scorpio': return require('../images/zodiac-scorpio-white.png')
    case 'taurus': return require('../images/zodiac-taurus-white.png')
    case 'virgo': return require('../images/zodiac-virgo-white.png')
    default: return null
  }
}

export class Scene extends Component {
  constructor(props) {
    super(props)
    this._opacity = new Animated.Value(0)

    this.fadeIn = this.fadeIn.bind(this)
    this.fadeOut = this.fadeOut.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.active && !prevProps.active) { this.props.enter(); this.fadeIn() }
    if (!this.props.active && prevProps.active) { this.props.exit(); this.fadeOut() }
  }

  componentDidMount() {
    if (this.props.active) { this.props.enter(); this.fadeIn() }
  }

  fadeIn() {
    Animated.timing(this._opacity, {
      toValue: 1,
      duration: timing.sceneInDuration,
      delay: timing.sceneOutDuration * 2,
      useNativeDriver: true,
    }).start(() => this.props.onFadeIn())
  }

  fadeOut() {
    Animated.timing(this._opacity, {
      toValue: 0,
      duration: timing.sceneOutDuration,
      useNativeDriver: true,
    }).start(() => this.props.onFadeOut())
  }

  render() {
    const {props, state} = this
    return(
      <Animated.View
        style={[style.scene, props.style, {opacity: this._opacity, zIndex: props.active ? 420 : 0}]}>
        <KeyboardAwareScrollView
          style={{height:screenHeight}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[style.sceneCont, props.contStyle]}>
          {props.children}
        </KeyboardAwareScrollView>
      </Animated.View>
    )
  }
}

Scene.defaultProps = {
  enter: () => null,
  exit: () => null,
  onFadeIn: () => null,
  onFadeOut: () => null,
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
    top: 0, left: 0,
    width: screenWidth,
    height: screenHeight,
  },
  scene: {
    position: 'absolute',
    top: 0, left: 0,
    width: screenWidth,
    height: screenHeight,
  },
  sceneCont: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
  zodiac: {
    width: em(6),
    height: em(6),
    position: 'absolute',
    top: em(1), right: em(1),
  }
})
