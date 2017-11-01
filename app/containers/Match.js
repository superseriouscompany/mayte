'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Header             from '../containers/Header'
import ChatView           from '../components/ChatView'
import MatchView          from '../components/MatchView'
import api                from '../services/api'
import { GiftedChat }     from 'react-native-gifted-chat'
import { View }             from 'react-native'

class Match extends Component {
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
          name:   this.props.user.fullName.split(' ')[0],
          avatar: this.props.user.photos[0].url,
        }
        return m
      })
      this.setState({messages: r.messages, loading: false})
    }).catch((err) => {
      this.setState({error: err.message || err, loading: false})
    })
  }

  render() {
    const {props, state} = this

    return (
      <View style={{flex: 1}}>
        <Header view={props.view} />
        <MatchView {...state} {...props}
                   setHeight={(h) => this.setState({viewHeight: h})}
                   showInfo={() => this.setState({infoOpen: true})}
                   hideInfo={() => this.setState({infoOpen: false})} />
        <ChatView {...state} {...props} onSend={this.onSend}/>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user:        state.scene.user,
    userId:      state.scene.user.id,
    accessToken: state.session.accessToken,
    view:        state.scene.view
  }
}

function mapDispatchToProps(dispatch) {
  return {
    send: function(text) {
      dispatch({})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Match)
