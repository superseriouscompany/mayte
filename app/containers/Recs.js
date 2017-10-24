'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import RecsView        from '../components/RecsView'
import api                from '../services/api'

class Recs extends Component {
  constructor(props) {
    super(props)
    this.like   = this.like.bind(this)
    this.pass  = this.pass.bind(this)
    this.state = {
      loading: true,
      index: 0,
      viewHeight: 0,
      // infoOpen: true,
    }
  }

  componentDidMount() {
    api('/recs', {accessToken: this.props.accessToken}).then((r) => {
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

  like(userId) {
    api(`/ratings/${userId}/like`, {
      method: 'POST',
      accessToken: this.props.accessToken
    }).then((r) => {
      if( r.match ) { alert('It\'s a match!') }
      this.setState({index: this.state.index + 1})
    }).catch((err) => {
      console.error(err)
      alert(err.message || err)
    })
  }

  pass(userId) {
    api(`/ratings/${userId}/pass`, {
      method: 'POST',
      accessToken: this.props.accessToken
    }).then((r) => {
      this.setState({index: this.state.index + 1})
    }).catch((err) => {
      console.error(err)
      alert(err.message || err)
    })
  }

  render() {
    return <RecsView {...this.state}
                     setHeight={(h) => this.setState({viewHeight: h})}
                     showInfo={() => this.setState({infoOpen: true})}
                     hideInfo={() => this.setState({infoOpen: false})}
                     like={this.like}
                     pass={this.pass} />
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.session.accessToken
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
