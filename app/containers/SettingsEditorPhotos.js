import React, { Component } from 'react'
import CurrentPhotos from '../containers/CurrentPhotos'
import { em, screenWidth, screenHeight } from '../constants/dimensions'
import ImagePicker from 'react-native-image-crop-picker'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  CameraRoll,
  ImageEditor,
  TouchableOpacity,
} from 'react-native'

export default class SettingsEditorPhotos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cameraRollOpen: false,
      cameraRollEdges: [],
      rearrangingPhotos: false,
      trashReady: false,
      photoBin: props.user.photos.map(p => new Object({uri: p.url})),
    }
    this.cropImage = this.cropImage.bind(this)
    this.editImage = this.editImage.bind(this)
    this.getFromCameraRoll = this.getFromCameraRoll.bind(this)
    this.pushToPhotoBin = this.pushToPhotoBin.bind(this)
  }

  cropImage(img) {
    return ImagePicker.openCropper({
      path: img.url,
      width: screenWidth,
      height: screenHeight,
    })
  }

  editImage(img) {
    return this.cropImage(img)
      .then(d => {
        return this.pushToPhotoBin(d.path)
      })
      .catch(err => {alert(err); return console.error(err)})
  }

  getFromCameraRoll() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.pushToPhotoBin(image.path)
    })
  }

  pushToPhotoBin(uri) {
    const photoBin = this.state.photoBin.map(p => p)
    photoBin.push({uri: uri})
    this.setState({photoBin: photoBin})
  }

  render() {
    const { props, state } = this
    return (
      <View>
        <View style={[style.padded, {zIndex: 100}]}>
          <View style={[style.sectionHeader]}>
            <Text style={[style.sectionHeaderLabel]}>PHOTOS</Text>
            <Text style={[style.sectionHeaderSublabel]}>{state.photoBin.length}/10</Text>
            <View style={[style.trashBin, {opacity: state.rearrangingPhotos ? 1 : 0, /*transform: [{scale: props.trashReady ? 1 : 0.8}]*/}]}
                  ref={(el) => trash = el}
                  onLayout={(e) => {
                    trash.measure((x, y, width, height, pageX, pageY) => {
                      this.setState({trashArea: {pageX, pageY, width, height}})
                    })
                  }}>
              <Image source={state.trashReady ?
                             require('../images/trash-open-white.png') :
                             require('../images/trash-closed-white.png') }
                     style={[style.trashBinIcon]}
                     resizeMode='contain' />
            </View>
          </View>
          <CurrentPhotos photoBin={state.photoBin}
                         active={state.rearrangingPhotos}
                         trashArea={state.trashArea}
                         toggleTrashReady={() => this.setState({trashReady: !state.trashReady})}
                         toggleActive={() => {
                           this.setState({rearrangingPhotos: !state.rearrangingPhotos})
                           props.toggleScroll()
                         }} />
        </View>
        <View>
          <Text style={[style.photoSelectLabel, {textAlign: 'center', color: 'white'}]}>
            SELECT FROM INSTAGRAM
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View>
              <View style={style.photoSelect}>
              {
                (props.user.availablePhotos.filter((p,i) => i%2===0) || []).map((p,i) => {
                  return (
                    <TouchableOpacity key={i} onPress={() => this.editImage(p.image)}>
                      <Image style={[style.photoSelectImg]}
                             resizeMode="cover"
                             source={{url: p.image.url}} />
                    </TouchableOpacity>
                  )
                })
              }
              </View>
              <View style={style.photoSelect}>
              {
                (props.user.availablePhotos.filter((p,i) => i%2===1) || []).map((p,i) => {
                  return (
                    <TouchableOpacity key={i} onPress={() => this.editImage(p.image)}>
                      <Image style={[style.photoSelectImg]}
                             resizeMode="cover"
                             source={{url: p.image.url}} />
                    </TouchableOpacity>
                  )
                })
              }
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={[style.photoSelectLabel, {textAlign: 'center', color: 'white'}]}>
            SELECT FROM CAMERA ROLL
          </Text>
          <TouchableOpacity onPress={() => {
                              this.setState({cameraRollOpen: true})
                              this.getFromCameraRoll()
                            }}>
            <View style={[style.cameraRollBtn]}>
              <Text style={{fontSize: em(1.5), color: 'white', height: em(2)}}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  padded: {
    paddingLeft: em(1),
    paddingRight: em(1),
  },
  sectionHeader: {
    paddingBottom: em(0.66),
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionHeaderLabel: {
    color: 'white',
    fontSize: em(1.2),
    letterSpacing: em(0.1),
    fontFamily: 'Gotham-Black',
  },
  sectionHeaderSublabel: {
    color: 'white',
    fontFamily: 'Gotham-Book',
    letterSpacing: em(0.1),
    marginLeft: em(0.66),
    marginTop: em(0.33),
  },
  photoSelect: {
    flexDirection: 'row',
    paddingLeft: em(1),
    paddingRight: em(1),
  },
  photoSelectLabel: {
    fontSize: em(1),
    fontFamily: 'Gotham-Black',
    letterSpacing: em(0.1),
    paddingTop: em(2),
    paddingBottom: em(1),
  },
  photoSelectImg: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: em(0.33),
    marginBottom: em(0.33),
    marginRight: em(0.33),
  },

  cameraRollBtn: {
    width: em(3),
    height: em(3),
    borderRadius: em(1.5),
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  trashBin: {
    height: em(1.66),
    width: em(1.66),
    marginLeft: em(0.33),
  },
  trashBinIcon: {
    width: '100%',
    height: '100%',
  }
})
