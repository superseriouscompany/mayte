'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import GamepadView        from '../components/GamepadView'

class Gamepad extends Component {
  constructor(props) {
    super(props)
    this.yup   = this.yup.bind(this)
    this.nope  = this.nope.bind(this)
    this.state = {
      loading: true,
      index: 0,
    }
  }

  componentDidMount() {
    fetch('https://superserious.ngrok.io/recs', {
      headers: {'X-Access-Token': this.props.session.accessToken}
    }).then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        recs: json.recs,
        loading: false,
      })
    }).catch((err) => {
      console.warn(err)
      this.setState({error: err.message, loading: false})
    })
  }

  yup() {
    alert('It\'s a match!')
    this.setState({index: this.state.index + 1})
  }

  nope() {
    this.setState({index: this.state.index + 1})
  }

  render() {
    return <GamepadView {...this.state} yup={this.yup} nope={this.nope}/>
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

export default connect(mapStateToProps)(Gamepad)
