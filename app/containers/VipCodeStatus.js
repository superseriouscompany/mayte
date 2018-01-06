'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import branch             from 'react-native-branch'
import VipCodeStatusView  from '../components/VipCodeStatusView'
import request            from '../actions/request'

class VipCodeStatus extends Component {
  constructor(props) {
    super(props)
    this.share    = this.share.bind(this)
    this.pollSelf = this.pollSelf.bind(this)
  }

  componentDidMount() {
    this.pollSelf()
  }

  pollSelf() {
    return this.props.getSelf().then((u) => {
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSelf: () => {
      return dispatch(request({
        url: '/users/me'
      }))
    },

    reset: () => {
      dispatch({type: 'vip:destroy'})
    },

    updateUser: (user) => {
      dispatch({type: 'user:set', user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VipCodeStatus)
