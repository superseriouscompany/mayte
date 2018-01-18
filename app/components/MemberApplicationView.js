import React, {Component}                                         from 'react'
import LinearGradient                                             from 'react-native-linear-gradient'
import DatePicker                                                 from 'react-native-datepicker'
import {StaticNight, Star}                                        from './Environment'
import {em, screenWidth, tabNavHeight, screenHeight, bottomBoost} from '../constants/dimensions'
import {mayteWhite}                                               from '../constants/colors'
import {ButtonGrey}                                               from './Button'
import {
  View,
  Text,
  Easing,
  Animated,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class MemberApplicationView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.step) {
      this.props.update({step: 'intro'})  
    }
  }

  render() {
    const {props, state} = this
    console.log(props.step)
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
        </StaticNight>

        <Intro {...props} next={() => props.update({step: 'email'})} />
        <Email {...props} next={() => props.update({step: 'dob'})} />

        <Scene
          active={props.step == 'dob'}>

          <DatePicker />
          <TouchableOpacity onPress={() => this.setState({active: 'website'})}>
            <Text>Next</Text>
          </TouchableOpacity>
        </Scene>

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

class Scene extends Component {
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

const Intro = (props) => {
  return(
    <Scene
      active={props.step == 'intro'}
      style={[style.intro]}>

      <Text style={[style.introText, style.introHeader]}>WELCOME</Text>
      <Text style={[style.introText, style.introBody]}>
      {`Welcome to Unicorn, a premium dating service unlike any other. Your membership provides entry to events, dinners, parties, and more within the Unicorn network. Tap the button below to begin your application — see you on the other side!`}
      </Text>

      <ButtonGrey
        style={{paddingLeft: em(2), paddingRight: em(2)}}
        onPress={props.next}
        text='Begin' />
    </Scene>
  )
}

class Email extends Component {
  constructor(props) {
    super(props)
    this._inputScaleX = new Animated.Value(0)
    this._buttonOpacity = new Animated.Value(0)
    this._buttonTranslateY = new Animated.Value(15)
    this.state = {value: '', ready: false}

    this.animButton = this.animButton.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.ready && !prevState.ready) { this.animButton(true) }
    if (!this.state.ready && prevState.ready) { this.animButton(false) }
  }

  animButton(ready) {
    Animated.parallel([
      Animated.timing(this._buttonOpacity, {
        toValue: ready ? 1 : 0,
        duration: 333,
        useNativeDriver: true,
      }),
      Animated.timing(this._buttonTranslateY, {
        toValue: ready ? 0 : 15,
        duration: 333,
        useNativeDriver: true,
      })
    ]).start()
  }

  handleInput(text) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.setState({value: text, ready: re.test(text)})
  }

  render() {
    const {props, state} = this
    return (
      <Scene
        active={props.step == 'email'}
        onFadeIn={() => {
          Animated.timing(this._inputScaleX, {
            toValue: 1,
            duration: 1000,
            easing: Easing.easeIn,
            useNativeDriver: true,
          }).start(() => this.input.focus())
        }}>

        <Animated.Text style={[style.emailText, style.emailHeader]}>EMAIL ADDRESS</Animated.Text>

        <Animated.View style={[style.emailInputCont, {transform: [{scaleX: this._inputScaleX}]}]}>
          <TextInput
            value={state.value}
            ref={el => this.input = el}
            style={[
              style.emailText,
              style.emailInput,
              (state.value.length > 15 ? {
                fontSize: screenWidth / state.value.length * 1.2
              } : {})
            ]}
            defaultValue={props.user.email}
            placeholderTextColor={mayteWhite(0.66)}
            onChangeText={this.handleInput} />
        </Animated.View>

        <Animated.View style={{opacity: this._buttonOpacity, transform: [{translateY: this._buttonTranslateY}]}}>
          <ButtonGrey
            style={{paddingLeft: em(2), paddingRight: em(2)}}
            onPress={props.next}
            text='Next' />
        </Animated.View>
      </Scene>
    )
  }
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

  intro: {paddingLeft: em(1), paddingRight: em(1)},
  introText: {backgroundColor: 'transparent', fontFamily: 'Futura', color: mayteWhite(), textAlign: 'center'},
  introHeader: {fontSize: em(2), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  introBody: {fontSize: em(1.2), marginBottom: em(3)},
  introButton: {},

  email: {},
  emailText: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  emailHeader: {fontSize: em(2), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  emailInputCont: {width: '66%', marginBottom: em(4)},
  emailInput: {width: '100%', fontSize: em(2), fontFamily: 'futura', letterSpacing: em(0.5), borderBottomWidth: 1, borderColor: mayteWhite(), paddingBottom: em(0.33)},
  emailButton: {},
})
