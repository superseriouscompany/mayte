'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import GenderSelectorView from '../components/GenderSelectorView'
import api                from '../services/api'

class GenderSelector extends Component {
  constructor(props) {
    super(props)
    this.select = this.select.bind(this)
    this.set    = this.set.bind(this)
    this.state  = {
      gender:      null,
      orientation: null,
    }
  }

  set(field, value) {
    var updates = {
      [field]: value
    }
    this.setState(updates)
  }

  setGender(gender) {
    this.setState({gender})
  }

  setOrientation(orientation) {
    this.setState({orientation})
  }

  select() {
    const {gender, orientation} = this.state

    if( !gender || !orientation ) { return }

    this.setState({loading: true})
    // TODO: do this optimistically
    api('/users/me', {
      method: 'PATCH',
      accessToken: this.props.accessToken,
      body: {
        preferences: {
          gender,
          orientation,
        }
      }
    }).then(() => {
      this.setState({loading: false})
      this.props.updateUser({gender, orientation})
    }).catch((err) => {
      this.setState({loading: false})
      alert(err.message || JSON.stringify(err))
      console.error(err)
    })
  }

  render() {
    return (
      <GenderSelectorView {...this.props}
        loading={this.state.loading}
        gender={this.state.gender}
        orientation={this.state.orientation}
        set={this.set}
        select={this.select} />
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
    updateUser: (user) => {
      dispatch({type: 'user:set', user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenderSelector)
