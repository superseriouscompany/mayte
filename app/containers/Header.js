'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import HeaderView       from '../components/HeaderView'

class Header extends Component {
  render() {
    const {props} = this

    return (
      <HeaderView {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    showSettings: function() {
      dispatch({type: 'scene:change', scene: 'Settings' })
    },

    showMatches: function() {
      dispatch({type: 'scene:change', scene: 'Matches'})
    },

    showRecs: function() {
      dispatch({type: 'scene:change', scene: 'Recs'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
