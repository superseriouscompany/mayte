'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import SettingsView       from '../components/SettingsView'
import api                from '../services/api'
import branch             from 'react-native-branch'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      loading: true,
      updatingBio: false,
      updatingDob: false,
    }
    this.activate      = this.activate.bind(this)
    this.deactivate    = this.deactivate.bind(this)
    this.updatePhotos  = this.updatePhotos.bind(this)
    this.update        = this.update.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
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
    var user;
    Promise.all([
      // TODO: why? isn't this in the reducer?
      api('/users/me', { accessToken: this.props.accessToken}),
      api('/photos/available', {accessToken: this.props.accessToken}),
    ]).then((v) => {
      const user = v[0]
      const activeIds = user.photos.map(p => p.instagramId)
      const photos = this.calculateActive(activeIds, v[1].photos)
      const bio = user.bio
      const dob = user.dob
      this.setState({ user: user, activeIds: activeIds, photos: photos, loading: false, bio: bio, dob: dob })
    }).catch((err) => {
      this.setState({ loading: false, error: err.message || err })
    })
  }

  deleteAccount() {
    this.setState({ loading: true })
    api('/users/me', {
      method: 'DELETE',
      accessToken: this.props.accessToken,
    }).then(this.props.logout).catch((err) => {
      this.setState({loading: false})
      alert(err.message || err)
      console.error(err)
    })
  }

  render() {
    return (
      <SettingsView {...this.state}
                    {...this.props}
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: function() {
      branch.logout()
      dispatch({type: 'user:destroy'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
