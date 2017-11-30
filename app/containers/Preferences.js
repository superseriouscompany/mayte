import React, { Component } from 'react'
import PreferencesView from '../components/PreferencesView'

const minAge = 18
const maxAge = 50

export default class Preferences extends Component {
  constructor(props) {
    super(props)

    const ps = props.user.preferences || {}
    const ageRange = ps.ageRange ? [ps.ageRange[0], ps.ageRange[1]] : [minAge, maxAge]

    this.state = {
      ageRange: ageRange
    }
  }

  render() {
    const { props, state } = this
    return(
      <PreferencesView {...props}
                       {...state}
                       minAge={minAge}
                       maxAge={maxAge}
                       updateAgeRange={(vals) => {
                         console.log(vals)
                         this.setState({ageRange: vals})
                       }} />
    )
  }
}
