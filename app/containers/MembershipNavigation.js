'use strict'

import React, {Component}                from 'react'
import {connect}                         from 'react-redux'
import Membership                        from './Membership'
import VipCodeInvite                     from './VipCodeInvite'
import Event                             from './Event'
import {StackNavigator, DrawerNavigator} from 'react-navigation'
import View                              from '../components/MembershipNavigationView'

class MembershipNavigation extends Component {
  constructor(props) {
    super(props)
    this.SubNav = DrawerNavigator({
          'Membership': { screen: Membership },
          'Invite Codes': { screen: VipCodeInvite },
          'Event': { screen: Event },
        }, {
          contentComponent: View,
          drawerWidth: 300,
          initialRouteName: props.scene.name.match('membership:event') ? 'Event' : 'Membership',
          // https://github.com/react-navigation/react-navigation/issues/3095#issuecomment-353371823
          drawerOpenRoute: 'DrawerOpen',
          drawerCloseRoute: 'DrawerClose',
          drawerToggleRoute: 'DrawerToggle',
        })
  }

  componentWillUpdate(props) {
    const {name, data} = props.scene
    if (name != this.props.scene.name && name.match('membership:event')) {
      this.navigator._navigation.navigate('Event', {eventId: data.id})
    }
  }

  render() {
    return <this.SubNav ref={n => this.navigator = n} />
  }
}

function mapStateToProps(state, ownProps) {
  return {
    scene: state.scene
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MembershipNavigation)
