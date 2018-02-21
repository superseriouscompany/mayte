'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import request   from '../actions/request'
import EventFeedbackView       from '../components/EventFeedbackView'
import EventCompletedView       from '../components/EventCompletedView'

class EventFeedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      complete: false,
    }
    this.confirm = this.confirm.bind(this)
  }

  confirm() {
    this.props.like(this.state.selected.id).then(() => {
      this.setState({complete: true})
    })
  }

  render() {
    return (
      this.state.complete ?
      <EventCompletedView {...this.props} /> :
      <EventFeedbackView {...this.props} {...this.state} select={(u) => this.setState({selected: u})} confirm={this.confirm} />
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    like: (uid) => {
      return dispatch(request({
        url: `/ratings/${uid}/like`,
        method: 'POST',
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventFeedback)
