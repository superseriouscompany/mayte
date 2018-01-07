'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import SettingsView       from '../components/SettingsView'
import request            from '../actions/request'
import branch             from 'react-native-branch'
import {clear}            from '../reducers'

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
    this.deleteAccount   = this.deleteAccount.bind(this)
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
    return this.props.hydrateUser().then((user) => {
      const photos = user.photos
      const bio = user.bio
      const dob = user.dob
      this.setState({ photos: photos, loading: false, bio: bio, dob: dob })
      this.props.setUser(user)
    }).catch((err) => {
      this.setState({ loading: false, error: err.message || err })
    })
  }

  deleteAccount() {
    return this.props.deleteAccount().catch((err) => {
      // TODO: nicer error message
      alert(err.message || err)
      console.error(err)
    })
  }

  render() {
    return (
      <SettingsView {...this.state}
                    {...this.props}
                    updateBaseScene={this.updateBaseScene}
                    hydrateUser={this.hydrateUser}
                    setBio={bio => this.setState({bio})}
                    setDob={dob => this.setState({dob})}
                    deleteAccount={this.deleteAccount} />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    scene: state.scene,
  }
}

function mapDispatchToProps(dispatch) {
  const dispatchProps = {
    hydrateUser: () => {
      return dispatch(request({
        url: '/users/me'
      }, true))
    },

    deleteAccount: () => {
      return dispatch(request({
        url: '/users/me',
        method: 'DELETE',
      })).then(dispatchProps.logout)
    },

    logout: () => {
      branch.logout()
      dispatch({type: 'user:destroy'})
      dispatch({type: 'vip:destroy'})
      clear()
    },

    viewSettingsPage: (view) => {
      dispatch({type: 'scene:change', scene: {
        name: 'Settings',
        view: view,
      }})
    },

    setUser: (user) => {
      dispatch({type: 'user:set', user: user})
    },
  }

  return dispatchProps
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
