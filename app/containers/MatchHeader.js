'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import MatchHeaderView    from '../components/MatchHeaderView'

class MatchHeader extends Component {
  render() {
    return (
      <MatchHeaderView {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {
    view: state.scene.view,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    showBlock: function() {
      confirm('Are you sure?')
    },

    showMatches: function() {
      dispatch({
        type: 'scene:change',
        scene: 'Matches'
      })
    },

    showProfile: function() {
      dispatch({
        type: 'scene:change',
        scene: {
          name: 'Match',
          view: 'Profile',
        }
      })
    },

    showChat: function() {
      dispatch({
        type: 'scene:change',
        scene: {
          name: 'Match',
          view: 'Chat',
        }
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchHeader)
