'use strict'

import React, {Component} from 'react'
import { GiftedChat }     from 'react-native-gifted-chat'
import {
  Text,
  View,
} from 'react-native'

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: [] }
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello world',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ]
    })
  }

  render() {
    const {props} = this

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{_id: 1}}
      />
    )
  }
}
