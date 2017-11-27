import React, { Component } from 'react'
import PreferencesView from '../components/PreferencesView'

export default class Preferences extends Component {
  render() {
    const { props, state } = this
    return(
      <PreferencesView {...props} />
    )
  }
}
