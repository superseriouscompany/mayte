'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import RecsPreviewView       from '../components/RecsPreviewView'

class RecsPreview extends Component {
  render() {
    return (
      <RecsPreviewView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RecsPreview)
