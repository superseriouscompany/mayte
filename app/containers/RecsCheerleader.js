import React, {Component}  from 'react'
import {connect}           from 'react-redux'
import RecsCheerleaderView from '../components/RecsCheerleaderView'

class RecsCheerleader extends Component {
  render() {
    return (
      <RecsCheerleaderView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RecsCheerleader)
