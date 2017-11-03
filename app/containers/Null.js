'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const {width, height} = Dimensions.get('window')

class Null extends Component {
  render() {
    const {props} = this

    return (
      <Wrapper style={{flex: 1}} implementation="react-navigation">
        <View style={[style.page, {backgroundColor: 'hotpink'}]} />
        <View style={[style.page, {backgroundColor: 'cornflowerblue'}]} />
        <View style={[style.page, {backgroundColor: 'mediumpurple'}]} />
        <View style={[style.page, {backgroundColor: 'palegreen'}]} />
      </Wrapper>
    )
  }
}

import Ionicons from 'react-native-vector-icons/Ionicons'
import { TabNavigator } from 'react-navigation'

function Wrapper(props) {
  switch(props.implementation) {
    case 'dumb':
      return (
        <ScrollView horizontal={true}>
          {props.children}
        </ScrollView>
      )
    case 'react-navigation':
      const TabNav = TabNavigator({
        Home: {
          screen: () => (
            <View style={[style.page, {backgroundColor: 'hotpink'}]} />
          ),
          tabBarLabel: 'Home',
          tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'}
                      size={26}
                      style={{color: tintColor}} />
          )
        },
        Profile: {
          screen: () => (
            <View style={[style.page, {backgroundColor: 'cornflowerblue'}]} />
          ),
          tabBarLabel: 'Profile',
          tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons name={focused ? 'ios-beer' : 'ios-beer-outline'}
                      size={26}
                      style={{color: tintColor}} />
          )
        },
        Cool: {
          screen: () => (
            <View style={[style.page, {backgroundColor: 'mediumpurple'}]} />
          ),
          tabBarLabel: 'Cool',
          tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons name={focused ? 'ios-boat' : 'ios-boat-outline'}
                      size={26}
                      style={{color: tintColor}} />
          )
        },
        Nice: {
          screen: () => (
            <View style={[style.page, {backgroundColor: 'palegreen'}]} />
          ),
          tabBarLabel: 'Nice',
          tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons name={focused ? 'ios-bitcoin' : 'ios-bowtie-outline'}
                      size={26}
                      style={{color: tintColor}} />
          )
        },
      }, {
        animationEnabled: true,
        swipeEnabled: true,
        lazy: true,
        initialRouteName: 'Home',
        tabBarOptions: {
          activeTintColor: 'hotpink',
        }
      })

      return (
        <TabNav />
      )
  }
}

const style = StyleSheet.create({
  page: {
    height: height,
    width:  width,
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
