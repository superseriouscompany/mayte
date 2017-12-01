import React, { Component } from 'react'
import PreferencesView from '../components/PreferencesView'
import api from '../services/api'

const minAge = 18
const maxAge = 50
const minDistance = 1
const maxDistance = 100

export default class Preferences extends Component {
  constructor(props) {
    super(props)

    const ps = props.user.preferences || {}
    const ageRange = ps.ageRange ? [ps.ageRange[0], ps.ageRange[1]] : [minAge, maxAge]
    const distance = ps.distance ? ps.distance : maxDistance

    this.state = {
      ageRange: ageRange,
      distance: distance,
    }

    this.updatePreferences = this.updatePreferences.bind(this)
  }

  updatePreferences() {
    api('/users/me', {
      method: 'PATCH',
      accessToken: this.props.accessToken,
      body: {
        preferences: {
          ageRange: this.state.ageRange,
          distance: this.state.distance,
        }
      }
    }).then(() => {
      console.log("updated preferences")
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
                       updateDistance={(d) => this.setState({distance: d})}
                       updateAgeRange={(vals) => this.setState({ageRange: vals})} />
    )
  }
}
