'use strict'

import React, {Component}       from 'react'
import DatePicker               from 'react-native-datepicker'
import {Scene}                  from './QuizView'
import {ButtonGrey}             from './Button'
import {mayteWhite, mayteBlack} from '../constants/colors'
import ImagePicker              from 'react-native-image-crop-picker'
import api                      from '../services/api'
import log                      from '../services/log'
import timing                   from '../constants/timing'
import {
  em,
  screenWidth,
  screenHeight
} from '../constants/dimensions'
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

const buttonHideY = 0

export default class QuizPhotosView extends Component {
  constructor(props) {
    super(props)
    this._buttonOpacity = new Animated.Value(0)
    this._buttonTranslateY = new Animated.Value(buttonHideY)

    this.state       = {ready: false}
    this.animButton  = this.animButton.bind(this)
    this.selectPhoto = this.selectPhoto.bind(this)
  }

  componentWillReceiveProps(props) {
    if( props.photos && props.photos.filter(i => i).length ) {
      this.setState({ready: true})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.ready && !prevState.ready) { this.animButton(true) }
    if (!this.state.ready && prevState.ready) { this.animButton(false) }
  }

  animButton(ready) {
    Animated.parallel([
      Animated.timing(this._buttonOpacity, {
        toValue: ready ? 1 : 0,
        duration: timing.quizButtonIn,
        useNativeDriver: true,
      }),
      Animated.timing(this._buttonTranslateY, {
        toValue: ready ? 0 : buttonHideY,
        duration: timing.quizButtonIn,
        useNativeDriver: true,
      })
    ]).start()
  }

  selectPhoto(idx) {
    ImagePicker.openPicker({
      width: screenWidth,
      height: screenHeight,
      cropping: true,
    }).then(image => {
      return this.props.selectPhoto(idx, image.path)
    }).catch((err) => {
      if (err.code === 'E_PICKER_CANCELLED') {return}
      log(err)
    })
  }

  render() {
    const {props, state} = this
    return (
      <Scene
        style={[style.container]}
        ref={el => this.scene = el}
        onFadeIn={() => {
          if (props.photos.filter(i => i).length) {
            this.setState({ready: true})
          }
        }}>
        <Text style={[style.text, style.header]}>PHOTOS</Text>
        <Text style={[style.text, style.body]}>
        {`Please submit up to 3 photos of yourself. Upon approval, these photos will be used to populate your profile. (You can always change them later.)`}
        </Text>
        <View style={style.slots}>
        {
          [0,1,2].map(idx => {
            return(
              <TouchableOpacity style={style.slot} key={idx} onPress={() => this.selectPhoto(idx)}>
                <View style={style.slotBg}><Text style={[style.text, {fontSize: em(2)}]}>+</Text></View>
                { (props.photos || [])[idx] ?
                    <Image style={style.slotImg} source={{uri: props.photos[idx].url}} resizeMode='cover' /> : null }
              </TouchableOpacity>
            )
          })
        }
        </View>

        <Animated.View style={{opacity: this._buttonOpacity, transform: [{translateY: this._buttonTranslateY}]}}>
          <ButtonGrey
            style={{paddingLeft: em(2), paddingRight: em(2)}}
            onPress={state.ready ? () => this.scene.fadeOut(props.next) : () => null}
            text={props.readyForSubmit ? 'Review & Submit' : 'Next'} />
        </Animated.View>
      </Scene>
    )
  }
}

const slotWidth = em(4.5)

const style = StyleSheet.create({
  container: {paddingRight: em(1), paddingLeft: em(1)},
  text: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  header: {fontSize: em(1.66), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  body: {fontSize: em(1.2), marginBottom: em(3)},
  slots: {flexDirection: 'row', marginBottom: em(3), width: slotWidth * 3.66, justifyContent: 'space-between'},
  slot: {width: slotWidth, height: slotWidth * 1.5, borderWidth: 1, borderColor: mayteWhite(0.33), borderRadius: em(0.5), backgroundColor: mayteBlack(0.5)},
  slotBg: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'},
  slotImg: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: em(0.5)}
})
