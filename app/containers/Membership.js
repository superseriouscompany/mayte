'use strict'

import React, {Component}                from 'react'
import {connect}                         from 'react-redux'
import MembershipView                    from '../components/MembershipView'
import Wallet                            from 'react-native-wallet'
import api, {baseUrl}                    from '../services/api'
import log                               from '../services/log'
import request                           from '../actions/request'

class Membership extends Component {
  constructor(props) {
    super(props)
    this.addPass = this.addPass.bind(this)
    this.state = {}
  }

  addPass() {
    Wallet.canAddPasses((ok) => {
      if( !ok ) {
        log('Unable to add passes');
        return alert('Unable to add pass. Please enable Apple Wallet.')
      }

      this.setState({loading: true})

      Wallet.showAddPassController(`${baseUrl}/wallet/${this.props.user.id}.pkpass?accessToken=${this.props.user.accessToken}`).then((ok) => {
        this.setState({loading: false})
        if( ok ) { alert('Pass added to Wallet.') }
      }).catch((err) => {
        this.setState({loading: false})
        console.warn(err)
      })
    })
  }

  render() {
    return (
      <MembershipView {...this.props}
        addPass={this.addPass}
        loading={this.state.loading} />
    )
  }
}

function mapStateToProps(state) {
  const apiCall = state.api['GET /events/v1'] || {}

  return {
    user:          state.user,
    isGold:        state.user.isAdmin || state.user.tier == 'gold',
    events:        state.events,
    eventsLoading: !!apiCall.loading,
    eventsFailed:  !!apiCall.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: (scene) => {
      return dispatch({type: 'scene:change', scene: scene})
    },

    loadEvents: (accessToken) => {
      return api(`graph`, {
        method: 'POST',
        accessToken: accessToken,
        body: {
          query: `
          {
            events{
              id,
              title,
              venue{
                name,
                geo{lat,lng}
              },
              invites{
                id
              },
              rsvps{
                user{
                  id
                },
                status
              },
              checkIns{
                user{id},
                time
              }
            }
          }
          `
        }
      }).then(r => {
        const {events} = r.data
        dispatch({type: 'events:set', events})
      }).catch((err) => {
        log(err)
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Membership)
