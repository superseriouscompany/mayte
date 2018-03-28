'use strict'

import React, {Component} from 'react'
import request            from '../actions/request'
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
    block: function(user) {
      dispatch(request({
        method: 'DELETE',
        url: `/matches/${user.id}`,
      })).then(() => {
        return dispatch({type: 'matches:invalidate'})
      }).then(() => {
        ownProps.screenProps.rootNav.navigate('Connections')
      })
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
