'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import ChatView           from '../components/ChatView'
import PropTypes          from 'prop-types'
import request            from '../actions/request'
import { GiftedChat }     from 'react-native-gifted-chat'

class Chat extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state            = { messages: [] }
    this.onSend           = this.onSend.bind(this)
  }

  componentWillReceiveProps(props) {
    if( props.messages.length == this.state.messages.length ) { return }
    this.setState({
      messages: props.messages.map((m) => {
        m._id = m.id,
        m.user = {
          _id:    m.userId,
          name:   this.props.user.fullName.split(' ')[0],
          avatar: this.props.user.photos[0].url,
        }
        return m
      })
    })
  }

  onSend(messages = []) {
    this.props.sendMessage(this.props.user.id, messages[0].text).then(() => {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
    }).catch((err) => {
      // TODO: provide error/retry options in chat
      console.error(err)
      alert(err.message || JSON.stringify(err))
    })
  }

  componentDidMount() {
    this.props.loadMessages(this.props.user.id)
  }

  render() {
    return (
      <ChatView {...this.props} {...this.state} onSend={this.onSend}/>
    )
  }
}

function mapStateToProps(state) {
  const response = state.api[`GET /matches/${state.scene.user.id}/messages`] || {}

  console.log('response is', response)

  return {
    messages: response.body && response.body.messages || [],
    loading:  response.loading,
    myId:     state.user.id,
    view:     state.scene.view,
    error:    response.error && response.error.message || response.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: function(userId, text) {
      return dispatch(request({
        url: `/matches/${userId}/messages`,
        method: 'POST',
        body: { text }
      }))
    },

    loadMessages: function(userId) {
      return dispatch(request({
        url: `/matches/${userId}/messages`,
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
