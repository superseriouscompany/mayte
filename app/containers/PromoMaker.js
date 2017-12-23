'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import PromoMakerView     from '../components/PromoMakerView'
import branch             from 'react-native-branch'
import api                from '../services/api'

class PromoMaker extends Component {
  constructor(props) {
    super(props)
    this.generate = this.generate.bind(this)
    this.state = {}
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

export default connect(mapStateToProps, mapDispatchToProps)(PromoMaker)
