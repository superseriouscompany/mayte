'use strict'

import React, {Component} from 'react'
import Header from '../containers/Header'
import MatchInfoView from './MatchInfoView'
import {
  Animated,
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  View,
} from 'react-native'

const useScratch = false
const {width, height} = Dimensions.get('window')

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blurValue: new Animated.Value(3)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.view === 'Profile' && this.props.view !== 'Profile') {
      this.enter()
    } else if (nextProps.view !== 'Profile' && this.props.view === 'Profile') {
      this.exit()
    }
  }

  enter() {
    Animated.timing(
      this.state.blurValue,
      {
        toValue: 0,
        duration: 333,
      }
    ).start()
  }

  exit() {
    Animated.timing(
      this.state.blurValue,
      {
        toValue: 3,
        duration: 333,
      }
    ).start()
  }

  render() {
    const {props, state} = this
    const imgStyle = {width: width, height: props.viewHeight}

    return (
      <View style={style.container}>
        <FlatList style={[style.container]}
                  onLayout={(e) => {
                    const {height} = e.nativeEvent.layout
                    props.setHeight(height)
                  }}
                  onScroll={(e) => {
                   const {contentOffset, layoutMeasurement, contentSize} = e.nativeEvent
                   if (contentOffset.y + layoutMeasurement.height > contentSize.height) {
                     e.preventDefault()
                     props.showInfo()
                   }
                  }}
                  showsVerticalScrollIndicator={false}
                  pagingEnabled
                  data={props.user.photos || []}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) =>
                    <Image style={imgStyle}
                           resizeMode="cover"
                           source={{url: item.url}} />
                  } />

        <MatchInfoView {...props} matchOpen={props.view === 'Profile'} />
      </View>
    )
  }
}

const style = {
  container: {
    flex: 1,
  },

  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },

  error: {
    color: 'red',
  },
}
