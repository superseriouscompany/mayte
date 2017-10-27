'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import MatchesView        from '../components/MatchesView'
import api                from '../services/api'

class Matches extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    api('/matches', {accessToken: this.props.accessToken}).then((r) => {
      this.setState({loading: false, matches: r.matches})
    }).catch((err) => {
      this.setState({loading: false, error: err.message || err})
    })
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
    accessToken: state.session.accessToken
  }
}

function mapDispatchToProps(dispatch) {
  return {
    viewChat: function(user) {
      dispatch({type: 'scene:change', scene: { name: 'Match', view: 'Chat', user: user }})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches)
