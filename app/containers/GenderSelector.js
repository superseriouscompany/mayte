'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import GenderSelectorView from '../components/GenderSelectorView'
import request            from '../actions/request'

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
    return this.props.updatePreferences({gender, orientation}).catch((err) => {
      alert(err.message || JSON.stringify(err))
      console.error(err)
      this.setState({loading: false})
    })
  }

  render() {
    return (
      <GenderSelectorView {...this.props}
        gender={this.state.gender}
        orientation={this.state.orientation}
        set={this.set}
        loading={this.state.loading}
        select={this.select} />
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePreferences: (preferences) => {
      return dispatch(request({
        url: '/users/me',
        method: 'PATCH',
        body: {
          preferences
        }
      })).then(() => {
        dispatch({type: 'user:set', user: preferences})
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenderSelector)
