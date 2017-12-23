'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import VipCodeStatusView  from '../components/VipCodeStatusView'
import branch             from 'react-native-branch'

class VipCodeStatus extends Component {
  constructor(props) {
    super(props)
    this.share = this.share.bind(this)
  }

  share() {
    const {promoCode} = this.props

    branch.createBranchUniversalObject(
      `promos/${promoCode}`,
      {
        metadata: {
          inviterId: this.props.userId,
          promoCode,
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    reset: () => {
      dispatch({type: 'vip:destroy'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VipCodeStatus)
