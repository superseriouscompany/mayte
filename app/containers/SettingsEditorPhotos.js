import React, { Component } from 'react'
import CurrentPhotos from '../containers/CurrentPhotos'
import { em, screenWidth, screenHeight } from '../constants/dimensions'
import ImagePicker from 'react-native-image-crop-picker'
import api, {oauthInstagram} from '../services/api'
import {
  View,
  Text,
  Image,
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  CameraRoll,
  ImageEditor,
  TouchableOpacity,
} from 'react-native'

export default class SettingsEditorPhotos extends Component {
  constructor(props) {
    super(props)

    this._trashOp = new Animated.Value(0)

    this.state = {
      cameraRollOpen: false,
      cameraRollEdges: [],
      rearrangingPhotos: false,
      trashReady: false,
      photoBin: props.user.photos.map(p => new Object({url: p.url})),
      toBeMoved: null,
    }
    this.cropImage = this.cropImage.bind(this)
    this.editImage = this.editImage.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.getFromCameraRoll = this.getFromCameraRoll.bind(this)
    this.seekAndReplacePath = this.seekAndReplacePath.bind(this)
    this.seekAndDestroyPhoto = this.seekAndDestroyPhoto.bind(this)
    this.pushToPhotoBin = this.pushToPhotoBin.bind(this)
    this.trashPhoto = this.trashPhoto.bind(this)
    this.reorder = this.reorder.bind(this)
    this.fadeTrash = this.fadeTrash.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.photoBin !== this.state.photoBin) {
      this.props.setPhotos(this.state.photoBin)
    }
    if (prevState.rearrangingPhotos !== this.state.rearrangingPhotos) {
      this.fadeTrash(this.state.rearrangingPhotos)
    }
  }

  fadeTrash(ready) {
    Animated.timing(this._trashOp, {
      toValue: ready ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  alertLimitReached() {
    Alert.alert("Limit Reached!", "Remove photos to add new ones", {text: "Ok"})
  }

  toggleActive(boo) {
    this.setState({rearrangingPhotos: boo})
    this.props.toggleScroll(!boo)
  }

  cropImage(img) {
    return ImagePicker.openCropper({
      path: img.url,
      width: screenWidth,
      height: screenHeight,
    })
  }

  editImage(img) {
    var localPath
    return this.cropImage(img)
      .then(img => {
        localPath = img.path
        this.pushToPhotoBin(localPath)
        return this.uploadImage(localPath)
      }).then(payload => {
        if (!payload || !payload.url) {return this.seekAndDestroyPhoto(localPath)}
        return this.seekAndReplacePath(localPath, payload.url)
      })
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {return}
        alert(err)
        this.seekAndDestroyPhoto(localPath)
        return console.error(err)
      })
  }

  uploadImage(localPath) {
    return api.upload({
      path: '/images',
      filePath: localPath,
      fieldName: 'image_file',
      fileName: `${this.props.user.id}_${Date.now()}.jpg`,
      fileType: 'image/jpeg',
    })
  }

  getFromCameraRoll() {
    var localPath
    ImagePicker.openPicker({
      width: screenWidth,
      height: screenHeight,
      cropping: true,
    }).then(image => {
      localPath = image.path
      this.pushToPhotoBin(localPath)
      return this.uploadImage(localPath)
    }).then(payload => {
      if (!payload || !payload.url) {return this.seekAndDestroyPhoto(localPath)}
      return this.seekAndReplacePath(localPath, payload.url)
    }).catch(err => {
      if (err.code === 'E_PICKER_CANCELLED') {return}
      alert(err)
      this.seekAndDestroyPhoto(localPath)
      return console.error(err)
    })
  }

  seekAndReplacePath(local, remote) {
    const photoBin = this.state.photoBin.map(p => {
      if( p.url === local ) { p.url = remote }
      return p
    })
    return this.setState({photoBin})
  }

  seekAndDestroyPhoto(path) {
    const photoBin = this.state.photoBin.map(p => {
      if( p.url === path ) { p = null }
      return p
    }).filter(p => p)
    return this.setState({photoBin})
  }

  pushToPhotoBin(path) {
    this.setState({photoBin: (this.state.photoBin || []).concat({url: path})})
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
            <Text style={[style.sectionHeaderSublabel]}>{state.photoBin.length}/{props.photoLimit}</Text>
            <View style={[style.trashBin, {/*transform: [{scale: props.trashReady ? 1 : 0.8}]*/}]}
                  ref={(el) => trash = el}
                  onLayout={(e) => {
                    trash.measure((x, y, width, height, pageX, pageY) => {
                      this.setState({trashArea: {pageX: pageX - em(1), pageY, width: width + em(2), height}})
                    })
                  }}>
              <Animated.Image source={state.trashReady ?
                              require('../images/trash-open-white.png') :
                              require('../images/trash-closed-white.png') }
                              style={[style.trashBinIcon, {opacity: this._trashOp}]}
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
          {
            props.user.instagramId ?
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View>
                <View style={style.photoSelect}>
                {
                  (props.user.availablePhotos.filter((p,i) => i%2===0) || []).map((p,i) => {
                    return (
                      <TouchableOpacity key={i}
                                        onPress={() => {
                                          if (state.photoBin.length >= props.photoLimit) {return this.alertLimitReached()}
                                          this.editImage(p.image)
                                        }}>
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
                      <TouchableOpacity key={i}
                                        onPress={() => {
                                          if (state.photoBin.length >= props.photoLimit) {return this.alertLimitReached()}
                                          this.editImage(p.image)
                                        }}>
                        <Image style={[style.photoSelectImg]}
                               resizeMode="cover"
                               source={{url: p.image.url}} />
                      </TouchableOpacity>
                    )
                  })
                }
                </View>
              </View>
            </ScrollView> :
            <View style={style.centered}>
              <TouchableOpacity style={style.connectIgBtn} onPress={() => oauthInstagram({connect: props.user.id})}>
                <Text style={style.connectIgText}>Connect Instagram</Text>
                 <Image style={style.connectIgLogo}
                        resizeMode='contain'
                        source={require('../images/ig-logo-black.png')} />
              </TouchableOpacity>
            </View>
          }
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={[style.photoSelectLabel, {textAlign: 'center', color: 'white'}]}>
            SELECT FROM CAMERA ROLL
          </Text>
          <TouchableOpacity onPress={() => {
                              if (state.photoBin.length >= props.photoLimit) {return this.alertLimitReached()}
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
    fontSize: em(1.1),
    letterSpacing: em(0.1),
    fontFamily: 'Futura',
    fontWeight: '700',
  },
  sectionHeaderSublabel: {
    color: 'white',
    fontFamily: 'Gotham-Book',
    letterSpacing: em(0.1),
    marginLeft: em(0.4),
    marginTop: em(0.3),
  },
  photoSelect: {
    flexDirection: 'row',
    paddingLeft: em(1),
    paddingRight: em(1),
  },
  photoSelectLabel: {
    fontSize: em(1),
    fontFamily: 'Futura',
    fontWeight: '500',
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
    // transform: [{translateY: -(em(33))}],
  },
  trashBinIcon: {
    width: '100%',
    height: '100%',
  },

  connectIgBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: em(1),
    marginBottom: em(0.33),
    paddingTop: em(0.8),
    paddingBottom: em(0.8),
    paddingLeft: em(1),
    paddingRight: em(1),
    backgroundColor: 'rgba(220,224,223,1)',
    maxWidth: '80%',
    borderRadius: em(0.33),
  },
  connectIgText: {
    backgroundColor: 'transparent',
    fontFamily: 'Gotham-Medium',
    marginRight: em(0.66),
    fontSize: em(1),
    marginTop: em(0.2),
    letterSpacing: em(0.05),
  },
  connectIgLogo: {
    width: em(2),
    height: em(2),
  },
})
