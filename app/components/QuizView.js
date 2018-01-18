import React, {Component}                                         from 'react'
import LinearGradient                                             from 'react-native-linear-gradient'
import moment                                                     from 'moment'
import {StaticNight, Star}                                        from './Environment'
import Intro                                                      from './QuizIntroView'
import Email                                                      from './QuizEmailView'
import Dob                                                        from './QuizDobView'
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

export default class QuizView extends Component {
  constructor(props) {
    super(props)
    this.state = { zodiac: null }
  }

  componentDidMount() {
    if (!this.props.step) {
      this.props.update({step: 'dob'})
    }

    this.setState({zodiac: this.computeZodiac(this.props.dob)})
  }

  computeZodiac(date) {
    console.log('computing zodiac')
    // this.setState({zodiac: 'pisces'})
    return null
  }

  updateDob(date) {
    this.setState({zodiac: this.computeZodiac(this.props.dob)})
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
    return <Image style={[style.zodiac]} source={src} resizeMode='contain'  />
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
          <Star style={{bottom: em(20), right: em(15)}} twinkleDelay={31300} />
          <Star style={{bottom: em(15), right: em(20)}} twinkleDelay={41500} />
          <Star style={{bottom: em(23), right: em(2)}} twinkleDelay={51300} />
          <Star style={{bottom: em(2), right: em(2)}} twinkleDelay={61200} />
          <Star style={{top: screenHeight * 0.64, right: em(18)}} twinkleDelay={61800} />

          {
            this.renderZodiac()
          }
        </StaticNight>

        <Intro {...props} next={() => props.update({step: 'email'})} />
        <Email {...props} next={() => props.update({step: 'dob'})} />
        <Dob {...props} next={() => props.update({step: 'email'})} update={(date) => this.updateDob} />

        <Scene
          active={props.step == 'website'}>

          <Text>Website</Text>
          <TouchableOpacity onPress={() => this.setState({active: 'photos'})}>
            <Text>Next</Text>
          </TouchableOpacity>
        </Scene>

        <Scene
          active={props.step == 'photos'}>

          <Text>Select Photos</Text>
          <TouchableOpacity onPress={() => this.setState({active: 'review'})}>
            <Text>Next</Text>
          </TouchableOpacity>
        </Scene>

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
      duration: 500,
      useNativeDriver: true,
    }).start(() => this.props.onFadeIn())
  }

  fadeOut() {
    Animated.timing(this._opacity, {
      toValue: 0,
      duration: 500,
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
    width: 100,
    height: 100,
    position: 'absolute',
    top: 20, right: 20,
  }
})
