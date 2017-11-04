'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Recs from './Recs'
import Matches from './Matches'
import Settings from './Settings'
import Match from './Match'

// react-navigation
import Icon from 'react-native-vector-icons/Ionicons'
import { TabNavigator } from 'react-navigation'

// react-native-swiper
import Swiper from 'react-native-swiper'

//react-native-swipe-a-lot
import SwipeALot from 'react-native-swipe-a-lot'

///react-native-page-swiper
import PageSwiper from 'react-native-page-swiper'

const {width, height} = Dimensions.get('window')

class Null extends Component {
  render() {
    const {props} = this

    console.log(props.scene)

    return (
      <Wrapper style={{flex: 1}} implementation="react-native-swiper">
        <Settings />
        <Recs />
        <Matches />
        {
          props.scene === "Match"
          ?
          <Match />
          :
          null
        }
      </Wrapper>
    )
  }
}

function Wrapper(props) {
  switch(props.implementation) {
    case 'dumb':
      return (
        <ScrollView horizontal={true}>
          {props.children}
        </ScrollView>
      )
    case 'react-navigation':
      var scenes = {}

      React.Children.forEach(props.children, (child, i) => {
        scenes[`${child.type.displayName}${i}`] = {
          screen: () => (
            child
          ),
          navigationOptions: {
            tabBarLabel: child.props.tabLabel,
            tabBarIcon:  child.props.tabIcon,
          }
        }
      })

      const TabNav = TabNavigator(scenes, {
        animationEnabled: true,
        swipeEnabled: true,
        lazy: true,
        tabBarOptions: {
          activeTintColor: 'hotpink',
        },
        initialRouteName: 'View1',
      })

      return (
        <TabNav />
      )
    case 'react-native-swiper':
      return (
        <Swiper loop={false} showsPagination={false} index={1}>
          {props.children}
        </Swiper>
      )
    case 'react-native-swipe-a-lot':
      return (
        <SwipeALot>
          {props.children}
        </SwipeALot>
      )
    case 'react-native-page-swiper':
      return(
        <PageSwiper>
          {props.children}
        </PageSwiper>
      )
    default:
      throw new Error('Unknown navigation wrapper implementation')
  }
}

const style = StyleSheet.create({
  page: {
    height:         height,
    width:          width,
    justifyContent: 'center',
    alignItems:     'center',
  }
})

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Null)
