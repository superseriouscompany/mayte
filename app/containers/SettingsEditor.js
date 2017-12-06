import React, { Component } from 'react'
import SettingsEditorView from '../components/SettingsEditorView'
import { screenWidth, screenHeight } from '../constants/dimensions'
import api from '../services/api'
import ImagePicker from 'react-native-image-crop-picker'
import {
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
      rearrangingPhotos: false,
    }

    this.save = this.save.bind(this)
    this.setPrivacyOption = this.setPrivacyOption.bind(this)
    this.cropImage = this.cropImage.bind(this)
    this.editImage = this.editImage.bind(this)
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
      this.props.viewProfile()
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
        let user = this.props.user
        user.photos.push({url: d.path})
        return this.props.setUser(user)
      })
      .catch(err => {alert(err); return console.error(err)})
  }

  render() {
    const { props, state } = this
    return(
      <SettingsEditorView {...props} {...state}
                          save={this.save}
                          options={this.options}
                          editImage={this.editImage}
                          setBio={text => this.setState({bio: text})}
                          setDob={date => this.setState({dob: date})}
                          setOccupation={text => this.setState({occupation: text})}
                          toggleRearrangingPhotos={() => this.setState({rearrangingPhotos: !this.state.rearrangingPhotos})}
                          setPrivacyOption={this.setPrivacyOption} />
    )
  }
}

export default SettingsEditor
