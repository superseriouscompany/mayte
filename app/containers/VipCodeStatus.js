'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import VipCodeStatusView  from '../components/VipCodeStatusView'
import branch             from 'react-native-branch'
import api                from '../services/api'

class VipCodeStatus extends Component {
  constructor(props) {
    super(props)
    this.share = this.share.bind(this)
  }

  componentDidMount() {
    this.pollSelf()
  }

  pollSelf() {
    return api('/users/me', {
      accessToken: this.props.accessToken
    }).then((u) => {
      if( u.active ) {
        this.props.updateUser(u)
      } else {
        setTimeout(this.pollSelf, 2000)        
      }
    }).catch((err) => {
      console.error(err)
      alert(err.message || JSON.stringify(err))
    })
  }

  share() {
    const {vipCode} = this.props

    branch.createBranchUniversalObject(
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
    }).catch((err) => {
      console.error(err)
      alert(err.message || JSON.stringify(err))
    })
  }

  render() {
    return (
      <VipCodeStatusView {...this.props}
        share={this.share} />
    )
  }
}

function mapStateToProps(state) {
  return {
    vipCode:     state.vip.code,
    userId:      state.user.id,
    unlockCount: state.vip.unlockCount,
    accessToken: state.user.accessToken,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    reset: () => {
      dispatch({type: 'vip:destroy'})
    },

    updateUser: (user) => {
      dispatch({type: 'user:set', user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VipCodeStatus)
