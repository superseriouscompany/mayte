'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import RecsView           from '../components/RecsView'
import request            from '../actions/request'
import log                from '../services/log'
import {
  Image
} from 'react-native'

class Recs extends Component {
  constructor(props) {
    super(props)
    this.like     = this.like.bind(this)
    this.pass     = this.pass.bind(this)
    this.decorate = this.decorate.bind(this)
    this.state = {
      viewHeight: 0,
      index: 0,
    }
  }

  componentDidMount() {
    this.props.loadRecs()
    this.decorate(this.props.recs)
  }

  componentWillReceiveProps(props) {
    if( props.recs.length == this.props.recs.length ) { return }
    this.decorate(props.recs)
  }

  decorate(recs) {
    recs.forEach(u => {
      u.photos.length && Image.prefetch(u.photos[0].url)
    })
  }

  like(u) {
    this.props.like(u.id).then((r) => {
      if ( r.match ) {
        this.props.itsAMatch()
        this.setState({match: u})
      }
      this.setState({index: this.state.index + 1})
    }).catch((err) => {
      // TODO: retry likes on queue without interrupting user flow
      log(err)
      alert(err.message || err)
    })
  }

  pass(u) {
    this.props.pass(u.id).then((r) => {
      this.setState({index: this.state.index + 1})
    }).catch((err) => {
      // TODO: retry failed passes on queue without interrupting user flow
      log(err)
      alert(err.message || err)
    })
  }

  render() {
    return (
      <RecsView {...this.props}
        like={this.like}
        pass={this.pass}
        setHeight={(h) => this.setState({viewHeight: h})}
        viewHeight={this.state.viewHeight}
        index={this.state.index}
        match={this.state.match}
        dismiss={() => this.setState({match: null})}
        />
    )
  }
}

function mapStateToProps(state) {
  const response = state.api['GET /recs'] || {}

  return {
    // TODO: display actual error and retry options
    error:       response.error && "Something went wrong",
    recs:        response.body && response.body.recs || [],
    loading:     !response.body && response.loading,
    exhausted:   response.error && response.error.statusCode == 410,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadRecs: () => {
      return dispatch(request({
        url: '/recs'
      }))
    },
    like: (userId) => {
      return dispatch(request({
        url: `/ratings/${userId}/like`,
        method: 'POST',
      }))
    },
    pass: (userId) => {
      return dispatch(request({
        url: `/ratings/${userId}/pass`,
        method: 'POST',
      }))
    },
    itsAMatch: () => {
      dispatch({type: 'matches:invalidate'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recs)
