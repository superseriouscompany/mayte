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

// react-navigation
import Icon from 'react-native-vector-icons/Ionicons'
import { TabNavigator } from 'react-navigation'

// react-native-swiper
import Swiper from 'react-native-swiper'

//react-native-swipe-a-lot
import SwipeALot from 'react-native-swipe-a-lot'

const {width, height} = Dimensions.get('window')

class Null extends Component {
  render() {
    const {props} = this

    return (
      <Wrapper style={{flex: 1}} implementation="react-native-swiper">
        <View style={[style.page, {backgroundColor: 'cornflowerblue'}]}
          tabLabel={"Dope"}
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
          tabLabel={"Fresh"}
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
          <View style={[style.page],{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink'}}>
            <Text>Swipe a Lot</Text>
          </View>
          <View style={[style.page],{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue'}}>
            <Text>Little in the middle</Text>
          </View>
          <View style={[style.page],{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'seagreen'}}>
            <Text>But she got much back</Text>
          </View>
        </SwipeALot>
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
