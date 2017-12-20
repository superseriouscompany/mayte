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
    this.activate        = this.activate.bind(this)
    this.deactivate      = this.deactivate.bind(this)
    this.deleteAccount   = this.deleteAccount.bind(this)
    this.updatePhotos    = this.updatePhotos.bind(this)
    this.hydrateUser     = this.hydrateUser.bind(this)
    this.updateBaseScene = this.updateBaseScene.bind(this)
  }

  activate(instagramId) {
    const activeIds = this.state.activeIds.concat(instagramId)
    this.updatePhotos(activeIds)
  }

  deactivate(instagramId) {
    const activeIds = this.state.activeIds.filter((id) => {
      return id != instagramId
    })
    this.updatePhotos(activeIds)
  }

  deleteAccount() {
    api('/users/me', {
      method: 'DELETE',
      accessToken: this.props.accessToken
    }).then(() => {
      this.props.logout()
    }).catch((err) => {
      alert(err.message || err)
      console.error(err)
    })
  }

  updatePhotos(activeIds) {
    this.setState({
      activeIds: activeIds,
      photos:    this.calculateActive(activeIds, this.state.photos),
    })
    api('/photos', {
      method: 'PUT',
      accessToken: this.props.accessToken,
      body: {
        photos: activeIds
      }
    }).catch((err) => {
      alert(err.message || err)
      console.error(err)
    })
  }

  update() {
    this.setState({updating: true})
    api('/users/me', {
      method: 'PATCH',
      accessToken: this.props.accessToken,
      body: {
        bio: this.state.bio,
        dob: this.state.dob,
      }
    }).then(() =>
      this.setState({updating: false})
    ).catch((err) => {
      alert(err.message || err)
      console.error(err)
    })
  }

  calculateActive(activeIds, photos) {
    return (photos || []).map((p) => {
      p.isActive = activeIds.indexOf(p.instagramId) !== -1
      return p
    })
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
      const photos = this.calculateActive(activeIds, v[1].photos)
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
                    // scene={{view:'Editor'}}
                    updateBaseScene={this.updateBaseScene}
                    hydrateUser={this.hydrateUser}
                    setBio={text => this.setState({bio: text})}
                    setDob={date => this.setState({dob: date})}
                    update={this.update}
                    activate={this.activate}
                    deactivate={this.deactivate}
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
