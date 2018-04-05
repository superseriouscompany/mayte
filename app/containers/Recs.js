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
      Image.prefetch(u.photos[0].url)
    })
  }

  render() {
    return (
      <RecsView {...this.props} />
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
        url: `/ratings/${userId}/pass`,
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
