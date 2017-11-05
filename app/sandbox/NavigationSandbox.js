'use strict'

// this sandbox is used to test multiple implementations of swipable navigation
//
// it contains:
//
// * react-navigation (currently used): React recommended navigation solution
// * react-native-swiper: simpler component that uses a ScrollView

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Navigation         from './Navigation'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

// react-navigation
import Icon from 'react-native-vector-icons/Ionicons'
import { TabNavigator } from 'react-navigation'

// react-native-swiper
import Swiper from 'react-native-swiper'

const {width, height} = Dimensions.get('window')

class Null extends Component {
  render() {
    const {props} = this

    return (
      <Navigation style={{flex: 1}} initialSceneName="Home">
        <View style={[style.page, {backgroundColor: 'cornflowerblue'}]}
          tabLabel="Dope"
          tabIcon={({tintColor, focused}) => (
            <Icon name={focused ? 'ios-home' : 'ios-home-outline'}
                  size={26}
                  style={{color: tintColor}} />
          )}
        >
          <Text>Testing</Text>
          <Text>Multiple <Text>Kids</Text></Text>
        </View>
        <View style={[style.page, {backgroundColor: 'hotpink'}]}
          sceneName="Home"
          tabLabel="Fresh"
          tabIcon={({tintColor, focused}) => (
            <Icon name={focused ? 'ios-beer' : 'ios-beer-outline'}
                  size={26}
                  style={{color: tintColor}} />
          )} />
        <View style={[style.page, {backgroundColor: 'mediumpurple'}]}
          tabIcon={({tintColor, focused}) => (
            <Icon name={focused ? 'ios-boat' : 'ios-boat-outline'}
                  size={26}
                  style={{color: tintColor}} />
          )} />
        <View style={[style.page, {backgroundColor: 'palegreen'}]}
          tabIcon={({tintColor, focused}) => (
            <Icon name={focused ? 'ios-nuclear' : 'ios-bowtie-outline'}
                  size={26}
                  style={{color: tintColor}} />
          )} />
      </Navigation>
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