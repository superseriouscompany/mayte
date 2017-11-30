import React, { Component } from 'react'
import SettingsEditorView from '../components/SettingsEditorView'
import api from '../services/api'

export default class SettingsEditor extends Component {
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
      bio: props.user.bio || '',
      occupation: props.user.occupation,
      showAge: privacyOptions.showAge || false,
      showLocation: privacyOptions.showLocation || false,
      showOccupation: privacyOptions.showOccupation || false,
      showInstagramFeed: privacyOptions.showInstagramFeed || false,
      showInstagramHandle: privacyOptions.showInstagramHandle || false,
    }

    this.save = this.save.bind(this)
    this.setPrivacyOption = this.setPrivacyOption.bind(this)
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

  render() {
    const { props, state } = this
    return(
      <SettingsEditorView {...props} {...state}
                          options={this.options}
                          save={this.save}
                          setBio={text => this.setState({bio: text})}
                          setDob={date => this.setState({dob: date})}
                          setOccupation={text => this.setState({occupation: text})}
                          setPrivacyOption={this.setPrivacyOption} />
    )
  }
}
