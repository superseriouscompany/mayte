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
        },
        Profile: {
          screen: () => (
            <View style={[style.page, {backgroundColor: 'cornflowerblue'}]} />
          ),
          tabBarLabel: 'Profile',
        },
        Cool: {
          screen: () => (
            <View style={[style.page, {backgroundColor: 'mediumpurple'}]} />
          ),
          tabBarLabel: 'Cool',
        },
        Nice: {
          screen: () => (
            <View style={[style.page, {backgroundColor: 'palegreen'}]} />
          ),
          tabBarLabel: 'Nice',
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
