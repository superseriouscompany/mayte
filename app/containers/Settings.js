'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import SettingsView       from '../components/SettingsView'
import api                 from '../services/api'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = { photos: [], loading: true }
    this.activate     = this.activate.bind(this)
    this.deactivate   = this.deactivate.bind(this)
    this.updatePhotos = this.updatePhotos.bind(this)
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

  calculateActive(activeIds, photos) {
    return photos.map((p) => {
      p.isActive = activeIds.indexOf(p.instagramId) !== -1
      return p
    })
  }

  componentDidMount() {
    var user;
    Promise.all([
      api('/users/me', { accessToken: this.props.accessToken}),
      api('/photos/available', {accessToken: this.props.accessToken}),
    ]).then((v) => {
      const user = v[0]
      const activeIds = user.photos.map(p => p.instagramId)
      const photos = this.calculateActive(activeIds, v[1].photos)
      console.log(photos)
      this.setState({ user: user, activeIds: activeIds, photos: photos, loading: false })
    }).catch((err) => {
      this.setState({ loading: false, error: err.message || err })
    })

  }

  render() {
    return (
      <SettingsView {...this.state} {...this.props} activate={this.activate} deactivate={this.deactivate}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.session.accessToken
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: function() {
      dispatch({type: 'session:destroy'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
