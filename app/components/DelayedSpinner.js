import React, {Component} from 'react'
import {
  ActivityIndicator,
} from 'react-native'

export default class DelayedSpinner extends Component {
  constructor(props) {
    super(props)
    this.state = { active: false }
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        active: true
      })
    }, this.props.delay || 500)
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout)
  }

  render() {
    const {props} = this

    return !this.state.active ? null : (
      <ActivityIndicator {...this.props}/>
    )
  }
}
