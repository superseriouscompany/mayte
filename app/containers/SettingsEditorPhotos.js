import React, { Component } from 'react'
import CurrentPhotos from '../containers/CurrentPhotos'
import { em, screenWidth, screenHeight } from '../constants/dimensions'
import ImagePicker from 'react-native-image-crop-picker'
import api, {baseUrl} from '../services/api'
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
      toBeMoved: null,
    }
    this.cropImage = this.cropImage.bind(this)
    this.editImage = this.editImage.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.getFromCameraRoll = this.getFromCameraRoll.bind(this)
    this.pushToPhotoBin = this.pushToPhotoBin.bind(this)
    this.trashPhoto = this.trashPhoto.bind(this)
    this.reorder = this.reorder.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
  }

  toggleActive() {
    this.setState({rearrangingPhotos: !this.state.rearrangingPhotos})
    this.props.toggleScroll()
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
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {return}
        alert(err)
        return console.error(err)
      })
  }

  uploadImage(path) {
    return new Promise((resolve, reject) => {
      var body = new FormData();
      body.append('image_file', {uri: path, name: 'photo.jpg', type: 'image/jpeg'});

      var xhr = new XMLHttpRequest;
      xhr.onreadystatechange = (e) => {
        if( xhr.readyState !== 4 ) { return; }

        if( xhr.status < 299 ) {
          const json = JSON.parse(xhr.responseText);
          return resolve(json)
        } else {
          reject(xhr.status + ': ' + xhr.responseText);
        }
      }
      xhr.open('POST', `${baseUrl}/images`);
      xhr.send(body);
    }).then((payload) => {
      console.log("UPLOAD PAYLOAD:", payload)
      // this.set('imageUrl', payload.url)
    }).catch((err) => {
      alert(err.message || JSON.stringify(err))
    })
  }

  getFromCameraRoll() {
    ImagePicker.openPicker({
      width: screenWidth,
      height: screenHeight,
      cropping: true,
    }).then(image => {
      this.uploadImage(image.path)
    }).then(data => {
      // console.log(image)
      // this.pushToPhotoBin(image.path)
      return console.log("DUNZO")
    }).catch(err => {
      if (err.code === 'E_PICKER_CANCELLED') {return}
      alert(err)
      return console.error(err)
    })
  }

  pushToPhotoBin(uri) {
    this.setState({photoBin: (this.state.photoBin || []).concat({uri: uri})})
  }

  trashPhoto(p) {
    let newBin = this.state.photoBin.filter(ph => {
      if (ph != p) return ph
    })
    this.setState({
      photoBin: newBin,
      trashReady: false,
      rearrangingPhotos: false,
    })
    this.props.toggleScroll()
  }

  reorder(from, to) {
    const pb = this.state.photoBin

    if (typeof from !== 'number' || typeof to !== 'number') {
      return console.log("reorder requires 2 index args")
    }

    let arr = new Array(this.state.photoBin.length)
    if (from > to) {
      for (let i = from; i > to; i--) {
        arr[i] = pb[i - 1]
      }
      arr[to] = pb[from]
    } else if (to > from) {
    	for (let i = from; i < to; i++) {
        arr[i] = pb[i + 1]
      }
      arr[to] = pb[from]
    } else {
      return
    }

    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) {
        arr[i] = pb[i]
      }
    }
    return this.setState({photoBin: arr, toBeMoved: null})
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
                         reorder={this.reorder}
                         active={state.rearrangingPhotos}
                         trashArea={state.trashArea}
                         trashPhoto={this.trashPhoto}
                         toBeMoved={state.toBeMoved}
                         setToBeMoved={(i) => this.setState({toBeMoved: i})}
                         toggleTrashReady={(boo) => this.setState({trashReady: boo})}
                         toggleActive={this.toggleActive} />
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
