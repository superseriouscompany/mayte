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
    scene: state.scene,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    showSettings: function() {
      dispatch({type: 'scene:change', scene: 'Settings' })
    },

    showMatches: function() {
      dispatch({
        type: 'scene:change',
        scene: {
          name: 'Matches',
        }
      })
    },

    showRecs: function() {
      dispatch({type: 'scene:change', scene: 'Recs'})
    },

    showMatch: function(user) {
      dispatch({
        type: 'scene:change',
        scene: {
          name: 'Match',
          view: 'Profile',
        }
      })
    },

    goBack: function(user) {
      let destination = ownProps.view === 'Profile' ?
                        {name: 'Match', view: 'Chat'} :
                        'Matches'

      dispatch({
        type: 'scene:change',
        scene: destination
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
