import React, {Component} from 'react'
import {connect}          from 'react-redux'
import api                from '../services/api'

class MatchesProvider extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated && !this.props.isAuthenticated) {
      this.props.loadMatches(nextProps.user.accessToken)
    }

    if (nextProps.dirty && !this.props.dirty) {
      this.props.loadMatches(nextProps.user.accessToken)
    }
  }

  render() {
    const {props} = this
    return (
      null
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.id,
    user: state.user,
    dirty: state.matches.dirty,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadMatches: (accessToken) => {
      dispatch({type: 'matches:load'})
      api('/matches', {accessToken: accessToken}).then((r) => {
        dispatch({type: 'matches:load:yes', matches: r.matches})
      }).catch((err) => {
        dispatch({type: 'matches:load:no', error: err.message || err})
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchesProvider)
