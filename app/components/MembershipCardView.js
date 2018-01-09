'use strict'

import React, {Component} from 'react'
import {screenWidth, screenHeight, em, notchHeight} from '../constants/dimensions'
import moment from 'moment'
import Text from './Text'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image resizeMode="cover" source={{uri: props.user.photos[0].url}} style={styles.mugshot}/>
        <View style={styles.middleCnr}>
          <Text style={styles.name}>{props.user.fullName}</Text>
          <Text style={styles.since}>Member since:{"\n"}{moment(props.user.createdAt).format('MMMM Do YYYY')}</Text>
          <Text style={styles.id}>{"\n"}Member ID:{"\n"} {props.user.id}</Text>
        </View>
        <View style={styles.rightCnr}>
          <Image style={styles.qrCode} source={require('../images/qr-code.jpg')} />
        </View>
      </View>

      { props.loading ?
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      :
        <TouchableOpacity style={styles.addToWallet} onPress={props.addPass}>
          <Image resizeMode="contain" style={styles.appleWalletLogo}
                 source={require('../images/add-to-apple-wallet-logo.png')} />
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    width: em(20),
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: em(3),
    padding: em(1),
    marginBottom: em(1),
    marginTop: notchHeight,
  },
  mugshot: {
    aspectRatio: screenWidth / screenHeight,
    width: '20%',
    marginLeft: em(1),
    marginRight: em(1),
  },
  since: {
    fontSize: 12,
  },
  id: {
    fontSize: 12,
  },
  middleCnr: {
    flex: 1,
  },
  rightCnr: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  qrCode: {
    width: em(6),
    height: em(6),
  },
  appleWalletLogo: {
    height: 50,
  },
})
