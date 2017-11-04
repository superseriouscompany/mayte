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
