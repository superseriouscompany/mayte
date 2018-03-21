import React, {Component} from 'react'
import {
  screenHeight,
  screenWidth,
  em,
  notchHeight,
} from '../constants/dimensions'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'

export default class RecsCheerleaderView extends Component {
  render() {
    const {props} = this

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollCnr}
          showsVerticalScrollIndicator={false}>
        { (props.recs||[]).map((r,i) =>
          <View key={i} style={[styles.rec, {
            backgroundColor: i%2 ? 'indianred' : 'navajowhite',
            marginLeft: i%2 ? em(0.25) : em(0.5),
            marginRight: i%2 ? em(0.5) : em(0.25),
            transform: [{translateY: i%2 ? em(3) : 0}]
          }]}>
            <Text>{r.fullName}</Text>
          </View> ) }
        </ScrollView>
      </View>
    )
  }
}

const recDims = {
  width: screenWidth / 2 - em(0.75),
  height: screenHeight / 2.5 - em(0.75),
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    width: '100%',
    flex: 1,
    backgroundColor: 'lightblue'
  },
  scrollCnr: {
    paddingTop: em(0.5) + notchHeight,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rec: {
    ...recDims,
    marginBottom: em(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  }
})
