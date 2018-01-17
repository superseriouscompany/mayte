import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import DatePicker from 'react-native-datepicker'
import {StaticNight, Star} from './Environment'
import {em, screenWidth, tabNavHeight, screenHeight, bottomBoost} from '../constants/dimensions'
import {mayteWhite} from '../constants/colors'
import {ButtonGrey} from './Button'
import {
  View,
  Text,
  Animated,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class MemberApplicationView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: null
    }
  }

  componentDidMount() {
    this.setState({active: 'intro'})
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
        </StaticNight>

        <Intro {...props} {...state} next={() => this.setState({active: 'email'})} />
        <Email {...props} {...state} next={() => this.setState({active: 'dob'})} />

        <Scene
          active={state.active == 'dob'}>

          <DatePicker />
          <TouchableOpacity onPress={() => this.setState({active: 'website'})}>
            <Text>Next</Text>
          </TouchableOpacity>
        </Scene>

        <Scene
          active={state.active == 'website'}>

          <Text>Website</Text>
          <TouchableOpacity onPress={() => this.setState({active: 'photos'})}>
            <Text>Next</Text>
          </TouchableOpacity>
        </Scene>

        <Scene
          active={state.active == 'photos'}>

          <Text>Select Photos</Text>
          <TouchableOpacity onPress={() => this.setState({active: 'review'})}>
            <Text>Next</Text>
          </TouchableOpacity>
        </Scene>

        <Scene
          active={state.active == 'review'}>

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

  componentDidUpdate(prevProps) {
    if (this.props.active && !prevProps.active) { this.fadeIn() }
    if (!this.props.active && prevProps.active) { this.fadeOut() }
  }

  fadeIn() {
    Animated.timing(this._opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  fadeOut() {
    Animated.timing(this._opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
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

const Intro = (props) => {
  return(
    <Scene
      active={props.active == 'intro'}
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
    this.state = {value: ''}
  }
  render() {
    const {props, state} = this
    return (
      <Scene
        active={props.active == 'email'}>

        <TextInput
          placeholder='Email'
          defaultValue={props.user.email}
          onChangeText={text => this.setState({value: text})}></TextInput>

        <ButtonGrey
          style={{paddingLeft: em(2), paddingRight: em(2)}}
          onPress={props.next}
          text='Next' />
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
  introHeader: {fontSize: em(2.5), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  introBody: {fontSize: em(1.2), marginBottom: em(2)},
  introButton: {},
})
