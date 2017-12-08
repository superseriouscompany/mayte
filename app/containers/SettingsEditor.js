import React, { Component } from 'react'
import SettingsEditorView from '../components/SettingsEditorView'
import { screenWidth, screenHeight } from '../constants/dimensions'
import api from '../services/api'
import ImagePicker from 'react-native-image-crop-picker'
import {
  CameraRoll,
  ImageEditor,
} from 'react-native'

class SettingsEditor extends Component {
  constructor(props) {
    super(props)

    const privacyOptions = props.user.privacyOptions || {}

    this.options = {
      showAge: {
        label: 'SHOW AGE',
      },
      showLocation: {
        label: 'SHOW LOCATION',
      },
      showOccupation: {
        label: 'SHOW OCCUPATION',
      },
      showInstagramFeed: {
        label: 'SHOW INSTAGRAM FEED',
      },
      showInstagramHandle: {
        label: 'SHOW INSTAGRAM HANDLE',
      },
    }

    this.state = {
      crop: null,
      saving: false,
      dob: props.user.dob,
      bio: props.user.bio || '',
      occupation: props.user.occupation,
      showAge: privacyOptions.showAge || false,
      showLocation: privacyOptions.showLocation || false,
      showOccupation: privacyOptions.showOccupation || false,
      showInstagramFeed: privacyOptions.showInstagramFeed || false,
      showInstagramHandle: privacyOptions.showInstagramHandle || false,
      cameraRollOpen: false,
      cameraRollEdges: [],
      rearrangingPhotos: false,
      trashReady: false,
      scrollEnabled: true,
      photoBin: props.user.photos.map(p => new Object({uri: p.url}))
    }

    this.save = this.save.bind(this)
    this.setPrivacyOption = this.setPrivacyOption.bind(this)
    this.cropImage = this.cropImage.bind(this)
    this.editImage = this.editImage.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.getFromCameraRoll = this.getFromCameraRoll.bind(this)
    this.pushToPhotoBin = this.pushToPhotoBin.bind(this)
  }

  save() {
    this.setState({saving: true})
    api('/users/me', {
      method: 'PATCH',
      accessToken: this.props.user.accessToken,
      body: {
        bio: this.state.bio,
        dob: this.state.dob,
        occupation: this.state.occupation,
        privacyOptions: {
          showAge: this.state.showAge,
          showLocation: this.state.showLocation,
          showOccupation: this.state.showOccupation,
          showInstagramFeed: this.state.showInstagramFeed,
          showInstagramHandle: this.state.showInstagramHandle,
        }
      }
    }).then(() => {
      this.setState({saving: false})
      this.props.hydrateUser()
      this.props.viewSettingsPage('Profile')
    }).catch((err) => {
      alert(err.message || err)
      console.error(err)
    })
  }

  setPrivacyOption(key, val) {
    let state = this.state
    state[key] = val
    this.setState(state)
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
        // let user = this.props.user
        // return this.props.setUser(user)
      })
      .catch(err => {alert(err); return console.error(err)})
  }

  cancelEdit() {
    // TODO: Alert user if they about to lose all that throbbing hard work
    this.props.viewSettingsPage(this.props.baseScene)
  }

  getFromCameraRoll() {
    CameraRoll.getPhotos({first: 20})
      .then(r => {
        let edges = this.state.cameraRollEdges
        r.edges.forEach(e => edges.push(e))
        this.setState({cameraRollOpen: true, cameraRollEdges: edges, scrollEnabled: false})
      })
      .catch(e => {
        console.error("Error loading images")
        alert(e)
      })
  }

  pushToPhotoBin(uri) {
    const photoBin = this.state.photoBin.map(p => p)
    photoBin.push({uri: uri})
    this.setState({photoBin: photoBin})
  }

  render() {
    const { props, state } = this
    return(
      <SettingsEditorView {...props} {...state}
                          save={this.save}
                          cancelEdit={this.cancelEdit}
                          options={this.options}
                          editImage={this.editImage}
                          getFromCameraRoll={this.getFromCameraRoll}
                          pushToPhotoBin={this.pushToPhotoBin}
                          closeCameraRoll={() => this.setState({cameraRollOpen: false, scrollEnabled: true})}
                          setBio={text => this.setState({bio: text})}
                          setDob={date => this.setState({dob: date})}
                          setOccupation={text => this.setState({occupation: text})}
                          setTrashArea={(layout) => this.setState({trashArea: layout})}
                          toggleTrashReady={() => this.setState({trashReady: !state.trashReady})}
                          toggleRearrangingPhotos={() => this.setState({rearrangingPhotos: !state.rearrangingPhotos, scrollEnabled: !state.scrollEnabled})}
                          setPrivacyOption={this.setPrivacyOption} />
    )
  }
}

export default SettingsEditor
