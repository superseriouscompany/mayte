'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import GenderSelectorView from '../components/GenderSelectorView'
import api                from '../services/api'

class GenderSelector extends Component {
  constructor(props) {
    super(props)
    this.select = this.select.bind(this)
    this.state = {}
  }

  select(gender) {
    alert('selecting...')

    this.setState({loading: true})
    // TODO: do this optimistically
    api('/users/me', {
      method: 'PATCH',
      accessToken: this.props.accessToken,
      body: {
        gender,
      }
    }).then(() => {
      this.setState({loading: false})
      this.props.dispatchGender(gender)
    }).catch((err) => {
      this.setState({loading: false})
      alert(err.message || JSON.stringify(err))
      console.error(err)
    })
  }

  render() {
    return (
      <GenderSelectorView {...this.props} select={this.select} loading={this.state.loading}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.user.accessToken,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchGender: (gender) => {
      dispatch({type: 'user:patch', user: {gender}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenderSelector)
