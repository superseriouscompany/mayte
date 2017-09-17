'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import MatchesView       from '../components/MatchesView'

class Matches extends Component {
  render() {
    const {props} = this

    return (
      <MatchesView {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches)
