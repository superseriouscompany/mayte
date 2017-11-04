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

import Icon from 'react-native-vector-icons/Ionicons'
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
          navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon name={focused ? 'ios-home' : 'ios-home-outline'}
                        size={26}
                        style={{color: tintColor}} />
            )
          }
        },
        Profile: {
          screen: () => (
            <View style={[style.page, {backgroundColor: 'cornflowerblue'}]} />
          ),
          navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon name={focused ? 'ios-beer' : 'ios-beer-outline'}
                size={26}
                style={{color: tintColor}} />
            )
          }
        },
        Cool: {
          screen: () => (
            <View style={[style.page, {backgroundColor: 'mediumpurple'}]} />
          ),
          navigationOptions: {
            tabBarLabel: 'Cool',
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon name={focused ? 'ios-boat' : 'ios-boat-outline'}
                        size={26}
                        style={{color: tintColor}} />
            )
          }
        },
        Nice: {
          screen: () => (
            <View style={[style.page, {backgroundColor: 'palegreen'}]} />
          ),
          navigationOptions: {
            tabBarLabel: 'Nice',
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon name={focused ? 'ios-nuclear' : 'ios-bowtie-outline'}
                        size={26}
                        style={{color: tintColor}} />
            )
          }
        }
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
