'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import branch             from 'react-native-branch'

class DeeplinkProvider extends Component {
  componentWillReceiveProps(props) {

  }

  componentDidMount() {
    this.unsubscribe = branch.subscribe(({error, params}) => {
      if( err ) {
        alert(err.message || JSON.stringify(err))
        console.error(err)
      }

      console.warn(params)
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() { return null }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeeplinkProvider)
