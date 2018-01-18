'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import VipCodeInviteView     from '../components/VipCodeInviteView'
import branch             from 'react-native-branch'
import api                from '../services/api'
import log                from '../services/log'

class VipCodeInvite extends Component {
  constructor(props) {
    super(props)
    this.generate = this.generate.bind(this)
    this.invite   = this.invite.bind(this)
    this.state = {}
  }

  invite() {
    return branch.createBranchUniversalObject(
      `invites`,
      {
        metadata: {
          inviterId: this.props.userId,
        }
      }
    ).then((branchUniversalObject) => {
      const linkProperties = {
        feature: 'invite',
        channel: 'app'
      }
      const controlParams = {}

      return branchUniversalObject.showShareSheet({
        messageHeader: 'Shhhhh...',
        messageBody:   'Unicorn: Find Yours.',
        emailSubject:  'Shhhhh...'
      }, linkProperties, controlParams)
    })
  }

  generate() {
    api('/promos', { method: 'POST', headers: {'X-Server-Secret': 'mayte'}}).then((json) => {
      const vipCode = json.code
      return branch.createBranchUniversalObject(
        `promos/${vipCode}`,
        {
          metadata: {
            inviterId: this.props.userId,
            vipCode,
          }
        }
      ).then((branchUniversalObject) => {
        const linkProperties = {
          feature: 'promo-redemption',
          channel: 'app'
        }
        const controlParams = {}

        return branchUniversalObject.showShareSheet({
          messageHeader: 'Shhhhh...',
          messageBody:   'I think you\'re a unicorn',
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
  return {
    userId: state.user.id,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    visitHome: () => {
      dispatch({type: 'scene:change', scene: 'Home'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VipCodeInvite)
