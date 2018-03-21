import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  screenHeight,
  screenWidth,
  em,
  notchHeight,
} from '../constants/dimensions'
import {
  mayteWhite,
  mayteBlack,
} from '../constants/colors'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

export default (props) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollCnr}
        showsVerticalScrollIndicator={false}>
      { (props.recs.filter(u => u.photos[0].url)||[]).map((r,i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => props.navigation.navigate('Bloobs', {boop: 'beep'})}
            style={[styles.rec, {
            marginLeft: i%2 ? em(0.25) : em(0.5),
            marginRight: i%2 ? em(0.5) : em(0.25),
            transform: [{translateY: i%2 ? tileOffset : 0}]
          }]}>
            <Image style={styles.recImg} source={{url: r.photos[0].url}} resizeMode={'cover'} />
            <LinearGradient colors={[mayteBlack(0), mayteBlack(0.5)]} style={[styles.recGrad]} />
            <Text style={styles.recName}>{r.fullName.split(' ')[0]}</Text>
          </TouchableOpacity>
        )
      }) }
      </ScrollView>
    </View>
  )
}

const recDims = {
  width: screenWidth / 2 - em(0.75),
  height: screenHeight / 2.5 - em(0.75),
}

const tileOffset = em(3)

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { width: '100%', flex: 1, },
  scrollCnr: { paddingTop: em(0.5) + notchHeight, paddingBottom: tileOffset, flexDirection: 'row', flexWrap: 'wrap', },
  rec: { ...recDims, marginBottom: em(0.5), justifyContent: 'flex-end', paddingBottom: em(1), alignItems: 'center', },
  recImg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  recGrad: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  recName: { fontFamily: 'futura', fontSize: em(1), color: mayteWhite(), backgroundColor: 'transparent', },
})
