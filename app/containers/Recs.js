'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import RecsView        from '../components/RecsView'
import api                from '../services/api'

class Recs extends Component {
  constructor(props) {
    super(props)
    this.yup   = this.yup.bind(this)
    this.nope  = this.nope.bind(this)
    this.state = {
      loading: true,
      index: 0,
    }
  }

  componentDidMount() {
    api('/recs', {accessToken: this.props.session.accessToken}).then((r) => {
      this.setState({
        recs: r.recs,
        loading: false,
      })
    }).catch((err) => {
      if( err.statusCode === 401 ) {
        return this.props.logout()
      }
      if( err.statusCode === 410 ) {
        return this.setState({loading: false, exhausted: true})
      }
      this.setState({error: err.message || err, loading: false})
    })
  }

  yup() {
    alert('It\'s a match!')
    this.setState({index: this.state.index + 1})
  }

  nope() {
    this.setState({index: this.state.index + 1})
  }

  render() {
    return <RecsView {...this.state} yup={this.yup} nope={this.nope}/>
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: function() {
      dispatch({type: 'session:destroy'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recs)
