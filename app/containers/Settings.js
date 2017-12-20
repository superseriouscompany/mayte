'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import SettingsView       from '../components/SettingsView'
import api                from '../services/api'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      loading: true,
      updatingBio: false,
      updatingDob: false,
      baseScene: 'Preferences',
    }
    this.hydrateUser     = this.hydrateUser.bind(this)
    this.updateBaseScene = this.updateBaseScene.bind(this)
  }

  componentDidMount() {
    this.hydrateUser()
  }

  updateBaseScene(name) {
    this.setState({baseScene: name})
  }

  hydrateUser(reload = true) {
    var user;
    if (reload) this.setState({loading: true});
    return Promise.all([
      api('/users/me', { accessToken: this.props.accessToken}),
      api('/photos/available', {accessToken: this.props.accessToken}),
    ]).then((v) => {
      const user = v[0]
      const activeIds = user.photos.map(p => p.instagramId)
      const photos = user.photos
      const bio = user.bio
      const dob = user.dob
      this.setState({ activeIds: activeIds, photos: photos, loading: false, bio: bio, dob: dob })
      this.props.setUser(user)
    }).catch((err) => {
      this.setState({ loading: false, error: err.message || err })
    })
  }

  render() {
    return (
      <SettingsView {...this.state}
                    {...this.props}
                    scene={{view:'Editor'}}
                    updateBaseScene={this.updateBaseScene}
                    hydrateUser={this.hydrateUser}
                    setBio={text => this.setState({bio: text})}
                    setDob={date => this.setState({dob: date})}
                    deleteAccount={this.deleteAccount} />
    )
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.user.accessToken,
    user: state.user,
    scene: state.scene,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch({type: 'user:destroy'})
    },
    viewSettingsPage: (view) => {
      dispatch({type: 'scene:change', scene: {
        name: 'Settings',
        view: view,
      }})
    },
    setUser: (user) => {
      dispatch({type: 'user:set', user: user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
