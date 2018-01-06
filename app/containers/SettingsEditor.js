import React, { Component }          from 'react'
import SettingsEditorView            from '../components/SettingsEditorView'
import { screenWidth, screenHeight } from '../constants/dimensions'
import { baseUrl }                   from '../services/api'
import { Linking }                   from 'react-native'
import {connect}                     from 'react-redux'
import request                       from '../actions/request'

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
      saving:              false,
      dob:                 props.user.dob,
      bio:                 props.user.bio,
      photos:              props.user.photos,
      occupation:          props.user.occupation,
      showAge:             privacyOptions.showAge || false,
      showLocation:        privacyOptions.showLocation || false,
      showOccupation:      privacyOptions.showOccupation || false,
      showInstagramFeed:   privacyOptions.showInstagramFeed || false,
      showInstagramHandle: privacyOptions.showInstagramHandle || false,
      scrollEnabled:       true,
    }

    this.save = this.save.bind(this)
    this.handleConnect = this.handleConnect.bind(this)
    this.setPrivacyOption = this.setPrivacyOption.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleConnect)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleConnect)
  }

  handleConnect(event) {
    if( !event.url ||
        (!event.url.match(/mayte:\/\/ig/) && !event.url.match(/mayte:\/\/li/)) ) {
      return console.warn('Unknown event url', event && event.url)
    }
    this.props.hydrateUser()
  }

  save() {
    this.setState({saving: true})
    this.props.updateUser({
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
    }).then(() => {
      this.setState({saving: false})
      this.props.hydrateUser()
      this.props.viewSettingsPage('Profile')
    }).catch((err) => {
      this.setState({saving: false})
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
                          options={(() => {
                            var op = {...this.options}
                            if (!props.user.instagramId) {
                              delete op.showInstagramFeed
                              delete op.showInstagramHandle
                            }
                            return op
                          })()}
                          photoLimit={photoLimit}
                          setPhotos={(bin) => this.setState({photos: bin})}
                          setBio={text => this.setState({bio: text})}
                          setDob={date => this.setState({dob: date})}
                          toggleScroll={(boo) => this.setState({scrollEnabled: boo})}
                          setOccupation={text => this.setState({occupation: text})}
                          setPrivacyOption={this.setPrivacyOption} />
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (body) => {
      return dispatch(request({
        url: '/users/me',
        method: 'PATCH',
        body,
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditor)
