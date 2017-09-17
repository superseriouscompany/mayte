'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import ChatView           from '../components/ChatView'
import api                from '../services/api'
import { GiftedChat }     from 'react-native-gifted-chat'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state  = { messages: [], loading: true }
    this.onSend = this.onSend.bind(this)
  }

  onSend(messages = []) {
    console.warn(messages[0])
    api(`/matches/${this.props.userId}/messages`, {
      method: 'POST',
      accessToken: this.props.accessToken,
      body: { text: messages[0].text}
    }).then(() => {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
    }).catch((err) => {
      alert(err.message || err)
    })
  }

  componentDidMount() {
    api(`/matches/${this.props.userId}/messages`, {
      accessToken: this.props.accessToken
    }).then((r) => {
      const messages = r.messages.map((m) => {
        m._id = m.id,
        m.user = {
          _id:    m.userId,
          name:   'Sancho Panza',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        }
        return m
      })

      this.setState({messages: r.messages, loading: false})
    }).catch((err) => {
      this.setState({error: err.message || err, loading: false})
    })
  }

  render() {
    return (
      <ChatView {...this.state} {...this.props} onSend={this.onSend}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId:      state.scene.userId,
    accessToken: state.session.accessToken,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    send: function(text) {
      dispatch({})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
