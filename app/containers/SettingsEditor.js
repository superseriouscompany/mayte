import React, { Component } from 'react'
import SettingsEditorView from '../components/SettingsEditorView'

export default class SettingsEditor extends Component {
  constructor(props) {
    super(props)
    this.options = [
      {
        label: 'SHOW AGE',
        action: (val) => console.log("AGE", val)
      },
      {
        label: 'SHOW LOCATION',
        action: (val) => console.log("LOCATION", val)
      },
      {
        label: 'SHOW OCCUPATION',
        action: (val) => console.log("OCCUPATION", val)
      },
      {
        label: 'SHOW INSTAGRAM FEED',
        action: (val) => console.log("INSTAGRAM FEED", val)
      },
      {
        label: 'SHOW INSTAGRAM HANDLE',
        action: (val) => console.log("INSTAGRAM HANDLES", val)
      }
    ]
  }

  render() {
    const { props, state } = this
    return(
      <SettingsEditorView {...props} options={this.options} />
    )
  }
}
