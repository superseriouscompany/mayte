'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import RecView            from '../components/RecView'
import IssaMatchView      from '../components/IssaMatchView'
import api                from '../services/api'
import {Image, View}      from 'react-native'

class Recs extends Component {
  constructor(props) {
    super(props)
    this.like   = this.like.bind(this)
    this.pass  = this.pass.bind(this)
    this.state = {
      loading: true,
      viewHeight: 0,
      recs: [],
    }
  }

  componentDidMount() {
    api('/recs', {accessToken: this.props.accessToken}).then((r) => {
      // TEMP: PLACING THIS HERE TO AVOID CHANGES ON VIEW RERENDERS //
      r.recs.forEach(u => {
        Image.prefetch(u.photos[0].url)
        u.distance = Math.ceil(Math.random() * 5)
      })
      ///////////////////////////////////////////////////////////////
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

  like(u) {
    api(`/ratings/${u.id}/like`, {
      method: 'POST',
      accessToken: this.props.accessToken
    }).then((r) => {
      if ( r.match ) {
        this.props.itsAMatch()
        this.setState({match: u})
      }
      const recs = this.state.recs
      recs.pop()
      this.setState({recs: recs})
    }).catch((err) => {
      console.error(err)
      alert(err.message || err)
    })
  }

  pass(u) {
    api(`/ratings/${u.id}/pass`, {
      method: 'POST',
      accessToken: this.props.accessToken
    }).then((r) => {
      const recs = this.state.recs
      recs.pop()
      this.setState({recs: recs})
    }).catch((err) => {
      console.error(err)
      alert(err.message || err)
    })
  }

  render() {
    const {props, state} = this
    return (
      <View style={{flex: 1}}>
      {
        this.state.recs.map((r,i,a) => {
          return <RecView {...state}
                          key={i}
                          rec={r}
                          setHeight={(h) => this.setState({viewHeight: h})}
                          like={this.like}
                          pass={this.pass} />
        })
      }
      {
        state.match ?
        <IssaMatchView viewHeight={state.viewHeight}
                       otherUser={state.match}
                       viewChat={() => props.viewChat(state.match)}
                       dismiss={() => this.setState({match: null})} /> : null
      }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.user.accessToken
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch({type: 'user:destroy'})
    },
    itsAMatch: () => {
      dispatch({type: 'matches:invalidate'})
    },
    viewChat: (user) => {
      dispatch({type: 'scene:change', scene: {
        name: 'Match',
        view: 'Chat',
        user: user,
      }})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recs)
