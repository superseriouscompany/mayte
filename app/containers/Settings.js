'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import SettingsView       from '../components/SettingsView'
import api                 from '../services/api'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = { photos: [], loading: true }
  }

  componentDidMount() {
    api('/photos/available', {accessToken: this.props.accessToken}).then((r) => {
      this.setState({ loading: false, photos: r.photos })
    }).catch((err) => {
      this.setState({ loading: false, error: err.message || err })
    })

    api('/users/me', { accessToken: this.props.accessToken}).then((user) => {
      this.setState({ user })
    }).catch((err) => {
      this.setState({ error: err.message || err })
    })
  }

  render() {
    return (
      <SettingsView {...this.state} {...this.props} />
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
