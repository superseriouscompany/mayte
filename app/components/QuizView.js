import React, {Component}              from 'react'
import {KeyboardAwareScrollView}       from 'react-native-keyboard-aware-scroll-view'
import LinearGradient                  from 'react-native-linear-gradient'
import {StaticNight, Star, StarSystem} from './Environment'
import Intro                           from './QuizIntroView'
import Vip                             from './QuizVipView'
import Email                           from './QuizEmailView'
import Dob                             from './QuizDobView'
import Website                         from './QuizWebsiteView'
import Photos                          from './QuizPhotosView'
import Freeform                        from './QuizFreeformView'
import Review                          from './QuizReviewView'
import Firework                        from './Firework'
import {mayteWhite, mayteBlack}        from '../constants/colors'
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
    this.renderScene = this.renderScene.bind(this)
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
          toValue: 0.1,
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

  renderScene() {
    const {props} = this
    const rfs = props.readyForSubmit
    switch(props.step) {
      case 'intro'   : return <Intro {...props} next={() => props.update({step: rfs ? 'review' : 'vip'})} />
      case 'vip'     : return <Vip {...props} value={props.vip} next={() => props.update({step: rfs ? 'review' : 'email'})} />
      case 'email'   : return <Email {...props} next={() => props.update({step: rfs ? 'review' : 'dob'})} />
      case 'dob'     : return <Dob {...props} next={() => props.update({step: rfs ? 'review' : 'website'})} updateDob={props.updateDob} />
      case 'website' : return <Website {...props} value={props.website} next={() => props.update({step: rfs ? 'review' : 'photos'})} />
      case 'photos'  : return <Photos {...props} next={() => props.update({step: rfs ? 'review' : 'freeform'})} />
      case 'freeform': return <Freeform {...props} next={() => props.update({step: rfs ? 'review' : 'review'})} />
      case 'review'  : return <Review {...props} />
    }
  }

  render() {
    const {props, state} = this
    return(
      <View style={style.container}>
        <StaticNight style={style.bg}>

          <StarSystem move={true} count={12} loopLength={240000} starProps={{size: 1, twinkle: true, style: {opacity: 1}}}></StarSystem>
          <StarSystem move={true} count={30} loopLength={120000} starProps={{size: 0.66, twinkle: false, style: {opacity: 0.66}}}></StarSystem>
          <StarSystem move={true} count={50} starProps={{size: 0.33, twinkle: false, style: {opacity: 0.33}}}></StarSystem>

          {
            this.renderZodiac()
          }
        </StaticNight>

        {this.renderScene()}

        { !__DEV__ ? null :
          <TouchableOpacity
            style={{position: 'absolute', bottom: em(1), left: em(1), alignSelf: 'flex-start', zIndex: 100000}}
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
            onPress={props.reset}>
            <Text style={{backgroundColor: 'transparent', color: 'white'}}>RESET</Text>
          </TouchableOpacity> }
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

  componentDidMount() {
    this.props.enter()
    this.fadeIn()
  }

  fadeIn() {
    Animated.timing(this._opacity, {
      toValue: 1,
      duration: timing.sceneInDuration,
      delay: timing.sceneOutDuration * 2,
      useNativeDriver: true,
    }).start(() => this.props.onFadeIn())
  }

  fadeOut(cb) {
    Animated.timing(this._opacity, {
      toValue: 0,
      duration: timing.sceneOutDuration,
      useNativeDriver: true,
    }).start(cb)
  }

  render() {
    const {props, state} = this
    return(
      <Animated.View
        style={[style.scene, props.style, {opacity: this._opacity, zIndex: props.active ? 420 : 0}]}>
        <KeyboardAwareScrollView
          style={{flex:1, height: '100%'}}
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

export class Input extends Component {
  constructor(props){
    super(props)
    this.focus = this.focus.bind(this)
  }

  focus() {
    this.input.focus()
  }

  render() {
    const {props,state} = this
    return(
      <Animated.View style={[inputStyle.outer, props.outerStyle]}>
        {/* TODO: commit Animated.TextInput to react-native -__- */}
        <Animated.View style={[inputStyle.inner, props.innerStyle]}>
          <TextInput
            value={props.value}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            ref={el => this.input = el}
            multiline={props.multiline}
            onLayout={e => {
              this.layout = e.nativeEvent.layout
            }}
            keyboardType={props.keyboardType}
            autoCapitalize={props.autoCapitalize}
            autoCorrect={props.autoCorrect}
            style={[inputStyle.input, props.inputStyle]}
            defaultValue={props.defaultValue}
            placeholderTextColor={props.placeholderTextColor}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            returnKeyType={props.returnKeyType}
            blurOnSubmit={props.blurOnSubmit}
            onSubmitEditing={props.onSubmitEditing} />
          </Animated.View>
      </Animated.View>
    )
  }
}

const inputStyle = StyleSheet.create({
  outer: {width: '66%', backgroundColor: mayteBlack(0.2), borderBottomWidth: 1, borderColor: mayteWhite(), borderRadius: 4, paddingBottom: em(0.33), paddingTop: em(0.33),},
  input: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura', width: '100%', letterSpacing: em(0.5), overflow: 'visible', fontSize: em(1.33)},
})

Input.defaultProps = {
  placeholderTextColor: mayteWhite(0.66),
}

const zodiacRadius = screenWidth / 2

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
    width: screenWidth,
    height: screenHeight,
  },
  sceneCont: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
  zodiac: {
    width: zodiacRadius * 2,
    height: zodiacRadius * 2,
    position: 'absolute',
    top: screenHeight/2-zodiacRadius,
    right: screenWidth/2-zodiacRadius,
  }
})
