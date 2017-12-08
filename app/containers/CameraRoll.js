import React, { Component } from 'react'
import CameraRollView from '../components/CameraRollView'

export default class CameraRoll extends Component {
  render() {
    const { props, state } = this
    return (
      <CameraRollView {...props} />
    )
  }
}
