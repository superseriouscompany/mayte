import React, { Component } from 'react'
import SettingsEditorView from '../components/SettingsEditorView'
import { screenWidth, screenHeight } from '../constants/dimensions'
import api from '../services/api'

const photoLimit = 8

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
      saving: false,
      dob: props.user.dob,
      bio: props.user.bio,
      photos: props.user.photos,
      occupation: props.user.occupation,
      showAge: privacyOptions.showAge || false,
      showLocation: privacyOptions.showLocation || false,
      showOccupation: privacyOptions.showOccupation || false,
      showInstagramFeed: privacyOptions.showInstagramFeed || false,
      showInstagramHandle: privacyOptions.showInstagramHandle || false,
      scrollEnabled: true,
    }

    this.save = this.save.bind(this)
    this.setPrivacyOption = this.setPrivacyOption.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
  }

  save() {
    this.setState({saving: true})
    api('/users/me', {
      method: 'PATCH',
      accessToken: this.props.user.accessToken,
      body: {
        bio: this.state.bio,
        dob: this.state.dob,
        photos: this.state.photos,
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

  cancelEdit() {
    // TODO: Alert user if they about to lose all that throbbing hard work
    this.props.viewSettingsPage(this.props.baseScene)
  }

  render() {
    const { props, state } = this
    return(
      <SettingsEditorView {...props} {...state}
                          save={this.save}
                          cancelEdit={this.cancelEdit}
                          options={this.options}
                          photoLimit={photoLimit}
                          setPhotos={(bin) => this.setState({photos: bin})}
                          setBio={text => this.setState({bio: text})}
                          setDob={date => this.setState({dob: date})}
                          toggleScroll={() => this.setState({scrollEnabled: !state.scrollEnabled})}
                          setOccupation={text => this.setState({occupation: text})}
                          setPrivacyOption={this.setPrivacyOption} />
    )
  }
}

export default SettingsEditor
