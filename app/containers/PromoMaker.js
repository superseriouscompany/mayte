'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import PromoMakerView     from '../components/PromoMakerView'
import branch             from 'react-native-branch'

class PromoMaker extends Component {
  constructor(props) {
    super(props)
    this.generate = this.generate.bind(this)
    this.state = {}
  }

  generate() {
    const promoCode = 'nope'

    branch.createBranchUniversalObject(
      `promos/${promoCode}`,
      {
        metadata: {
          inviterId: 'whatever',
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
      <PromoMakerView {...this.props} url={this.state.url} generate={this.generate}/>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromoMaker)
