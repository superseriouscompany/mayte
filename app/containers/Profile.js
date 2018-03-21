import React, {Component} from 'react'
import {connect}          from 'react-redux'
import ProfileView       from '../components/TempProfileView'
import {
  screenHeight,
  bottomBoost,
  tabNavHeight,
} from '../constants/dimensions'

class Profile extends Component {
  render() {
    return (
      <ProfileView
        {...this.props}
        setHeight={()=>null}
        viewHeight={screenHeight-bottomBoost-tabNavHeight-10}
        user={this.props.navigation.state.params.user} />
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
