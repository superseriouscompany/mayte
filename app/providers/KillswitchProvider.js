'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import request            from '../actions/request'
import log                from '../services/log'

class KillswitchProvider extends Component {
  componentDidMount() {
    return this.props.checkVersion().catch((err) => {
      if( err.statusCode == 426 ) {
        return this.props.kill()
      }
      // TODO: retry on 500
      log(err)
    })
  }

  componentWillReceiveProps(props) {

  }

  render() { return null }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkVersion: function() {
      return dispatch(request({
        url: '/version',
        headers: {
          'X-App-Version': '0.9.0'
        }
      }))
    },

    kill: function() {
      return dispatch({type: 'scene:change', scene: 'Dead'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KillswitchProvider)
