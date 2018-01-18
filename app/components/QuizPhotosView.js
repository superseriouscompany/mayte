'use strict'

import React, {Component}              from 'react'
import DatePicker                      from 'react-native-datepicker'
import {Scene}                         from './QuizView'
import ImagePicker                     from 'react-native-image-crop-picker'
import {ButtonGrey}                    from './Button'
import {mayteWhite, mayteBlack}        from '../constants/colors'
import {em, screenWidth, screenHeight} from '../constants/dimensions'
import api                             from '../services/api'
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class Photos extends Component {
  constructor(props) {
    super(props)
    this._buttonOpacity = new Animated.Value(0)
    this._buttonTranslateY = new Animated.Value(15)
    this.getFromCameraRoll = this.getFromCameraRoll.bind(this)

    this.state = {ready: false}

    this.animButton = this.animButton.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.seekAndReplacePath = this.seekAndReplacePath.bind(this)
    this.seekAndDestroyPhoto = this.seekAndDestroyPhoto.bind(this)
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

  uploadImage(localPath) {
    return api.upload({
      path: '/images',
      filePath: localPath,
      fieldName: 'image_file',
      fileName: `${this.props.user.id}_${Date.now()}.jpg`,
      fileType: 'image/jpeg',
    }).then(p => {
      return p
    })
  }

  getFromCameraRoll(idx) {
    var localPath
    var photos = this.props.photos.slice(0)
    ImagePicker.openPicker({
      width: screenWidth,
      height: screenHeight,
      cropping: true,
    }).then(image => {
      localPath = image.path
      photos[idx] = localPath
      this.props.update({photos})
      return this.uploadImage(localPath)
    }).then(payload => {
      if (!payload || !payload.url) {return this.seekAndDestroyPhoto(localPath)}
      return this.seekAndReplacePath(localPath, payload.url)
    }).catch(err => {
      if (err.code === 'E_PICKER_CANCELLED') {return}
      alert(err)
      this.seekAndDestroyPhoto(localPath)
      return log(err)
    })
  }

  seekAndReplacePath(local, remote) {
    const photos = this.props.photos.map(p => {
      if( p === local ) { p = remote }
      return p
    })
    return this.props.update({photos})
  }

  seekAndDestroyPhoto(path) {
    const photos = this.props.photos.map(p => {
      if( p === path ) { p = null }
      return p
    }).filter(p => p)
    return this.props.update({photos})
  }

  render() {
    const {props, state} = this
    return (
      <Scene
        style={[style.container]}
        active={props.step == 'photos'}
        onFadeIn={() => {
          this.animButton(props.photos.filter(i => i).length)
        }}>
        <Text style={[style.text, style.header]}>PHOTOS</Text>
        <Text style={[style.text, style.body]}>
        {`Please submit up to 3 photos of yourself. Upon approval, these photos will be used to populate your profile. (You can always change them later.)`}
        </Text>
        <View style={style.slots}>
        {
          [0,1,2].map(idx => {
            return(
              <TouchableOpacity style={style.slot} key={idx} onPress={() => this.getFromCameraRoll(idx)}>
                <View style={style.slotBg}><Text style={[style.text, {fontSize: em(2)}]}>+</Text></View>
                { props.photos[idx] ?
                    <Image style={style.slotImg} source={{uri: props.photos[idx]}} resizeMode='cover' /> : null }
              </TouchableOpacity>
            )
          })
        }
        </View>

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
