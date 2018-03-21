import React, {Component} from 'react'
import {connect} from 'react-redux'
import Settings from './Settings'
import VelvetRope from './VelvetRope'
import MatchBridge from './MatchBridge'
import RecsNavigator from './RecsNavigator'
import RootNavigatorView from '../components/RootNavigatorView'
import {
  DrawerNavigator,
  withNavigation,
} from 'react-navigation'

class RootNavigator extends Component {
  constructor(props) {
    super(props)

    this.Nav = DrawerNavigator({
      Settings: {
        screen: Settings,
      },
      Membership: {
        screen: VelvetRope,
      },
      Recs: {
        screen: RecsNavigator,
      },
      Connections: {
        screen: MatchBridge
      }
    }, {
      contentComponent: RootNavigatorView,
      drawerWidth: 300,
      initialRouteName: 'Recs',
      // https://github.com/react-navigation/react-navigation/issues/3095#issuecomment-353371823
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
    })

    this.state = {}
  }

  componentDidMount() {
    // TEMP: hack to force rootNav into screenProps
    this.setState({mounted: 'great'})
  }

  render() {
    return(
      <this.Nav
        {...this.props} {...this.state}
        ref={n => this.navigator = n}
        screenProps={{
          rootNav: this.navigator ? this.navigator._navigation : null,
          boop: 'beep',
        }} />
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator)
