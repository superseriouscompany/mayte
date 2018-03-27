'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import MatchesView        from '../components/MatchesView'
import api                from '../services/api'

class Matches extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {props} = this
    return (
      <MatchesView {...this.state} {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {
    matches: state.matches.data,
    loading: state.matches.loading,
    error: state.matches.error,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    viewChat: function(user) {
      ownProps.navigation.navigate('Match', {user})
      dispatch({type: 'scene:change', scene: {
        name: 'Match',
        view: 'Chat',
        user: user,
      }})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches)
