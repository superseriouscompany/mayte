import React, { Component } from 'react'
import PreferencesView      from '../components/PreferencesView'
import {connect}            from 'react-redux'
import api                  from '../services/api'

const minAge = 18
const maxAge = 50
const minDistance = 1
const maxDistance = 100

class Preferences extends Component {
  constructor(props) {
    super(props)

    const ps = props.user.preferences || {}
    const ageRange = ps.ageRange ? [ps.ageRange[0], ps.ageRange[1]] : [minAge, maxAge]
    const distance = ps.distance ? ps.distance : maxDistance

    this.state = {
      ageRange: ageRange,
      distance: distance,
      orientation: ps.orientation,
      gender: ps.gender,
    }

    this.updatePreferences = this.updatePreferences.bind(this)
  }

  componentDidMount() {
    this.props.updateBaseScene('Preferences')
  }

  updatePreferences(prefs={}) {
    return api('/users/me', {
      method: 'PATCH',
      accessToken: this.props.accessToken,
      body: {
        preferences: {
          ageRange: this.state.ageRange,
          distance: this.state.distance,
          orientation: this.state.orientation,
          gender: this.state.gender,
          ...prefs,
        }
      }
    }).then(() => {
      console.log("updated preferences")
      this.props.hydrateUser(false)
    }).catch(err => {
      alert(err.message || err)
      console.error(err)
    })
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
                       updatePreferences={this.updatePreferences}
                       updateGender={(p) => this.setState({gender: p})}
                       updateDistance={(d) => this.setState({distance: d})}
                       updateAgeRange={(vals) => this.setState({ageRange: vals})}
                       updateOrientation={(p) => this.setState({orientation: p})} />
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
