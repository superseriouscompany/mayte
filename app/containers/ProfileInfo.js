import React, {Component} from 'react'
import {connect}          from 'react-redux'
import ProfileInfoView       from '../components/ProfileInfoView'

class ProfileInfo extends Component {
  render() {
    return (
      <ProfileInfoView ref={i => this.props.setRef(i)} {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    visitChat(user) {
      Promise.resolve().then(() => {
        return dispatch({
          type: 'scene:change',
          scene: {
            name: 'Match',
            view: 'Chat',
          }
        })
      }).then(() => {
        return ownProps.screenProps.rootNav.navigate('Chat', {user: ownProps.user})
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)
