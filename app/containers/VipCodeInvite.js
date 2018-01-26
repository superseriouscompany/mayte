'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import VipCodeInviteView  from '../components/VipCodeInviteView'
import branch             from 'react-native-branch'
import log                from '../services/log'
import request            from '../actions/request'

class VipCodeInvite extends Component {
  constructor(props) {
    super(props)
    this.generate = this.generate.bind(this)
    this.state = {}
  }

  generate(tier, message) {
    if( this.props.loading ) { return }

    this.props.createCode(tier).then((json) => {
      const vipCode = json.code
      return branch.createBranchUniversalObject(
        `promos/${vipCode}`,
        {
          metadata: {
            inviterId: this.props.userId,
            vipCode,
            tier,
          }
        }
      ).then((branchUniversalObject) => {
        const linkProperties = {
          feature: 'vip-code',
          channel: 'app'
        }
        const controlParams = {}

        return branchUniversalObject.showShareSheet({
          messageHeader: 'Shhhhh...',
          messageBody:   message,
          emailSubject:  'Shhhhh...'
        }, linkProperties, controlParams)
      }).then((payload) => {
        const {url} = payload
        this.setState({url})
      })
    }).catch((err) => {
      log(err)
      alert(err.message || JSON.stringify(err))
    })
  }

  render() {
    return (
      <VipCodeInviteView {...this.props}
        url={this.state.url}
        generate={this.generate}
        invite={this.invite}
        />
    )
  }
}

function mapStateToProps(state) {
  const apiCall = state.api['POST /vipCodes'] || {}

  return {
    userId:  state.user.id,
    isAdmin: !!state.user.isAdmin,
    loading: !!apiCall.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    visitHome: () => {
      dispatch({type: 'scene:change', scene: 'Home'})
    },

    createCode: (tier) => {
      return dispatch(request({
        url: '/vipCodes',
        method: 'POST',
        body: { tier }
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VipCodeInvite)
