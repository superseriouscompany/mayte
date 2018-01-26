import React, { Component } from 'react'
import PreferencesView      from '../components/PreferencesView'
import {connect}            from 'react-redux'
import request              from '../actions/request'
import log                  from '../services/log'
import firebase             from '../services/firebase'

const minAge = 18
const maxAge = 50
const minDistance = 1
const maxDistance = 100

class Preferences extends Component {
  constructor(props) {
    super(props)

    const ps = props.user.preferences || {}
    const ageRange = ps.ageRange ? [ps.ageRange[0], ps.ageRange[1]] : [minAge, maxAge]
    const distance = ps.distance ? ps.distance : maxDistance*.5

    this.state = {
      ageRange: ageRange,
      distance: distance,
      orientation: ps.orientation,
      gender: ps.gender,
    }

    this.updatePreferences = this.updatePreferences.bind(this)
    this.enableNotifications = this.enableNotifications.bind(this)
  }

  componentDidMount() {
    this.props.updateBaseScene('Preferences')
  }

  updatePreferences(prefs={}) {
    return this.props.updatePreferences({
      ageRange: this.state.ageRange,
      distance: this.state.distance,
      orientation: this.state.orientation,
      gender: this.state.gender,
      ...prefs,
    }).then(() => {
      this.props.hydrateUser(false)
    }).catch(err => {
      alert(err.message || err)
      log(err)
    })
  }

  enableNotifications() {
    firebase.messaging().requestPermissions()
    this.props.markPerms()
  }

  render() {
    const { props, state } = this
    return(
      <PreferencesView {...props}
                       {...state}
                       minAge={minAge}
                       maxAge={maxAge}
                       minDistance={minDistance}
                       maxDistance={maxDistance}
                       enableNotifications={this.enableNotifications}
                       updatePreferences={this.updatePreferences}
                       updateGender={(p) => this.setState({gender: p})}
                       updateDistance={(d) => this.setState({distance: d})}
                       updateAgeRange={(vals) => this.setState({ageRange: vals})}
                       updateOrientation={(p) => this.setState({orientation: p})} />
    )
  }
}

function mapStateToProps(state) {
  return {
    hasNotifPerms: !!state.permissions.notifications,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePreferences: function(preferences) {
      return dispatch(request({
        url: '/users/me',
        method: 'PATCH',
        body: { preferences }
      }, true))
    },
    markPerms: () => {
      return dispatch({type: 'permissions:ask', permission: 'notifications'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
