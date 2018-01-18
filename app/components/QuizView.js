import React, {Component}                                         from 'react'
import LinearGradient                                             from 'react-native-linear-gradient'
import moment                                                     from 'moment'
import {StaticNight, Star, StarSystem}                            from './Environment'
import Intro                                                      from './QuizIntroView'
import Email                                                      from './QuizEmailView'
import Dob                                                        from './QuizDobView'
import Website                                                    from './QuizWebsiteView'
import Photos                                                     from './QuizPhotosView'
import Firework                                                   from './Firework'
import {em, screenWidth, tabNavHeight, screenHeight, bottomBoost} from '../constants/dimensions'
import {mayteWhite}                                               from '../constants/colors'
import {ButtonGrey}                                               from './Button'
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

const sceneInDuration = 500
const sceneOutDuration = 500
const zodiacInDuration = 500

export default class QuizView extends Component {
  constructor(props) {
    super(props)
    this.state = { zodiac: null }
    this._zodiacOpacity = new Animated.Value(0)
    this.updateDob = this.updateDob.bind(this)
  }

  componentDidMount() {
    if (!this.props.step) {
      this.props.update({step: 'dob'})
    }

    this.setState({zodiac: this.computeZodiac(this.props.dob)})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.zodiac && !prevState.zodiac) {
      Animated.timing(this._zodiacOpacity, {
        toValue: 1,
        duration: zodiacInDuration,
        useNativeDriver: true,
      }).start()
    }
  }

  computeZodiac(date) {
    const mom   = moment(date, 'MMM Do YYYY')
    const month = mom.month()
    const day   = mom.day()
    let zodiac
    switch (month) {
    	case 0:  if(day < 20)zodiac='capricorn';else zodiac='aquarius';break;
    	case 1:  if(day < 19)zodiac='aquarius';else zodiac='pisces';break;
    	case 2:  if(day < 21)zodiac='pisces';else zodiac='aries';break;
    	case 3:  if(day < 20)zodiac='aries';else zodiac='taurus';break;
    	case 4:  if(day < 21)zodiac='taurus';else zodiac='gemini';break;
    	case 5:  if(day < 21)zodiac='gemini';else zodiac='cancer';break;
    	case 6:  if(day < 23)zodiac='cancer';else zodiac='leo';break;
     	case 7:  if(day < 23)zodiac='leo';else zodiac='virgo';break;
    	case 8:  if(day < 23)zodiac='virgo';else zodiac='libra';break;
    	case 9:  if(day < 23)zodiac='libra';else zodiac='scorpio';break;
    	case 10: if(day < 22)zodiac='scorpio';else zodiac='sagittarius';break;
    	case 11: if(day < 22)zodiac='sagittarius';else zodiac='capricorn';break;
      default: return null;
     }
    return zodiac
  }

  updateDob(date) {
    this.setState({zodiac: this.computeZodiac(date)})
    this.props.update({dob: date})
  }

  renderZodiac() {
    if (!this.state.zodiac) {return}
    let src
    switch (this.state.zodiac) {
      case 'aquarius': src = require('../images/zodiac-aquarius-white.png'); break;
      case 'aries': src = require('../images/zodiac-aries-white.png'); break;
      case 'cancer': src = require('../images/zodiac-cancer-white.png'); break;
      case 'capricorn': src = require('../images/zodiac-capricorn-white.png'); break;
      case 'gemini': src = require('../images/zodiac-gemini-white.png'); break;
      case 'leo': src = require('../images/zodiac-leo-white.png'); break;
      case 'libra': src = require('../images/zodiac-libra-white.png'); break;
      case 'pisces': src = require('../images/zodiac-pisces-white.png'); break;
      case 'sagittarius': src = require('../images/zodiac-sagittarius-white.png'); break;
      case 'scorpio': src = require('../images/zodiac-scorpio-white.png'); break;
      case 'taurus': src = require('../images/zodiac-taurus-white.png'); break;
      case 'virgo': src = require('../images/zodiac-virgo-white.png'); break;
      default:
        return null
        break
    }
    return <Animated.Image style={[style.zodiac, {opacity: this._zodiacOpacity}]} source={src} resizeMode='contain'  />
  }

  render() {
    const {props, state} = this
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
{
          // <StarSystem count={600} spiralB={10} spiralA={10} starProps={{size: 0.5, twinkle: false, style: {opacity: 0.8}}}></StarSystem>
          // <StarSystem count={60} spin={false} spiralA={50} reverse={true} starProps={{size: 0.66, twinkle: false, style: {opacity: 0.9}}}></StarSystem>
}
          {
            this.renderZodiac()
          }
        </StaticNight>

        <Intro {...props} next={() => props.update({step: 'email'})} />
        <Email {...props} next={() => props.update({step: 'dob'})} />
        <Dob {...props} next={() => props.update({step: 'website'})} updateDob={this.updateDob} />
        <Website {...props} next={() => props.update({step: 'photos'})} />
        <Photos {...props} next={() => props.update({step: 'review'})} />

        <Scene
          active={props.step == 'review'}>

          <Text>Review</Text>
        </Scene>
      </View>
    )
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
      duration: sceneInDuration,
      delay: sceneOutDuration * 2,
      useNativeDriver: true,
    }).start(() => this.props.onFadeIn())
  }

  fadeOut() {
    Animated.timing(this._opacity, {
      toValue: 0,
      duration: sceneOutDuration,
      useNativeDriver: true,
    }).start(() => this.props.onFadeOut())
  }

  render() {
    const {props, state} = this
    return(
      <Animated.ScrollView
        style={[style.scene, props.style, {opacity: this._opacity, zIndex: props.active ? 420 : 0}]}
        contentContainerStyle={style.sceneCont}>
        {props.children}
      </Animated.ScrollView>
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
    flex: 1,
  },
  zodiac: {
    width: em(6),
    height: em(6),
    position: 'absolute',
    top: em(1.66), right: em(1),
  }
})
