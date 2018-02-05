'use strict'

import React, {Component}                    from 'react'
import RNFirebase                            from 'react-native-firebase'
import { NativeModules, NativeEventEmitter } from 'react-native'
import { GeoLocation }                       from 'react-native'
import SafariView                            from 'react-native-safari-view'
import Wallet                                from 'react-native-wallet'
import branch                                from 'react-native-branch'
import { Client }                            from 'bugsnag-react-native';
import {ButtonGrey}       from '../components/Button'
import {Input}            from '../components/QuizView'
import log                                   from '../services/log'
const { InAppUtils } = NativeModules
const Fabric         = require('react-native-fabric')
// const SafariView     = require('react-native-safari-view')
const {Crashlytics}  = Fabric


import api from '../services/api'
import stripe from 'tipsi-stripe'

import {connect}          from 'react-redux'


import {
  mayteWhite
} from '../constants/colors'
import {
  em
} from '../constants/dimensions'
import {
  Animated,
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'


const firebase = RNFirebase.initializeApp({
  debug: true,
})

class Scratch extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [] }
    this.buy = this.buy.bind(this)
    this.crash = this.crash.bind(this)
  }

  buy(id) {
    InAppUtils.purchaseProduct(id, (err, response) => {
      if( err ) { return alert(err.message) }
      if( response && response.productIdentifier ) {
        return alert('Purchase Successful: '+response.transactionIdentifier)
      }
      console.warn('Unknown response', err, response)
    })
  }

  crash() {
    var err = new Error('nope')
    Crashlytics.recordError('halp')
    Crashlytics.crash()
  }

  componentDidMount() {
    SafariView.show({
      url: 'https://github.com/naoufal'
    });

    stripe.init({
      publishableKey: __DEV__ ? 'pk_test_S8LaqXK0DDyLfhyVoHr8ERsA': 'pk_live_vev4Dm6AXgNWcfx1UD3DIKx9',
      merchantId:     'merchant.com.unicorn.dating',
    })


    // var q = {}
    // stripe.paymentRequestWithApplePay([
    //   { label: 'fack', amount: "$100.00" }
    // ]).then((body) => {
    // // stripe.paymentRequestWithCardForm({
    // //   theme: {
    // //     backgroundColor: 'hotpink',
    // //     foregroundColor: 'cornflowerblue',
    // //   }
    // // }).then((body) => {
    //   console.warn(JSON.stringify(body))
    //   q.stripeToken = body.tokenId
    //   // example body
    //   // {"livemode":false,"created":1517445933,"card":{"funding":"unknown","cardId":"card_1BqWCnJHAfGPPsvG5kYxLRA6","country":"US","isApplePayCard":false,"expMonth":11,"brand":"Visa","last4":"1111","expYear":2022},"tokenId":"tok_1BqWCnJHAfGPPsvGVB9HoSp9"}
    //   return api('/creditCards', {method: 'POST', body})
    //   // api.post('/creditCards', { body: {}})
    // }).then(() => {
    //   const {stripeToken} = q
    //   return api('/subscriptions', { method: 'POST', stripeToken })
    // }).then(() => {
    //   alert('cool')
    // }).catch(console.error)

    return;

    log(new Error('sweet'))

    branch.createBranchUniversalObject(
      `promos/nice`,
      {
        metadata: {
          inviter_id: 'whatever',
        }
      }
    ).then((branchUniversalObject) => {
      const linkProperties = {
        feature: 'promo-redemption',
        channel: 'app'
      }
      const controlParams = {}

      branchUniversalObject.generateShortUrl(linkProperties, controlParams).then((payload) => {
        alert(payload.url)
      })
    }).catch((err) => {
      log(err)
    })

    navigator.geolocation.requestAuthorization()

    navigator.geolocation.getCurrentPosition(function yes(cool) {
      console.log(cool)
    }, function no(err) {
      alert('Couldn\'t get location')
      console.warn(err)
    })

    const products = [
      'com.mayte.dev.monthly'
    ]

    InAppUtils.canMakePayments((enabled) => {
      if(!enabled) { return alert('IAP disabled') }

      InAppUtils.loadProducts(products, (err, products) => {
        if( err ) { log(err) }
        this.setState({products})
      })
    })


    firebase.messaging().requestPermissions()

    firebase.messaging().getToken().then((token) => {
      console.log('Device FCM Token: ', token)
    })

    firebase.messaging().onTokenRefresh((token) => {
      console.log('Updated device FCM Token: ', token)
    })

    firebase.messaging().getInitialNotification().then((notification) => {
      console.log('Notification which opened the app: ', notification)
    })

    firebase.messaging().onMessage((message) => {
      console.log('Got message', message)
    })

    firebase.database()
      .ref('posts')
      .on('value', (snapshot) => {
        console.warn('got snapshot', snapshot.val())
      })

    setTimeout(() => {
      firebase.database()
        .ref('posts')
        .set({
          title: 'My post',
          content: 'Some content',
        }).catch((err) => {
          console.warn(err)
        })
    }, 1000)
  }

  render() {
    const {props, state} = this

    const fontBase = em(1)

    return (
      <View>
        <Text>
          Yes
        </Text>
      </View>
    )

    return (
      <Animated.ScrollView contentContainerStyle={styles.cnr}>
        <KeyboardAvoidingView style={styles.cnr} keyboardVerticalOffset={-160} behavior="position" contentContainerStyle={styles.cnr}>
          <Text style={styles.text}>Do you believe in keyboard magic</Text>

          <Input
            outerStyle={[styles.inputOuter, {width: '80%', borderWidth: 1, minHeight: fontBase * 8, paddingLeft: em(0.66), paddingRight: em(0.66), borderColor: mayteWhite(0.1)}, ]}
            innerStyle={[styles.inputInner, {width: '100%'}]}
            inputStyle={styles.input}
            onChangeText={this.handleInput}
            ref={el => this.input = el}
            defaultValue={props.freeform}
            multiline={true}
            blurOnSubmit={true}
            value={state.value} />

          <ButtonGrey text="Cool" style={styles.button}/>
        </KeyboardAvoidingView>
      </Animated.ScrollView>
    )

    // purchasing and crashing
    return (
      <View style={{padding: 20}}>
        <TouchableOpacity onPress={this.crash}>
          <Text>Crash</Text>
        </TouchableOpacity>

        { this.state.products.map((p, key) => (
          <TouchableOpacity key={key} onPress={() => this.buy(p.identifier)}>
            <Text>
              {p.title}: {p.description} {p.priceString}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cnr: { width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lawngreen'},
  text: {backgroundColor: 'transparent', color: 'hotpink', textAlign: 'center', fontFamily: 'Futura', fontSize: 20, marginBottom: 10, },
  header: {fontSize: em(1.33), marginBottom: em(3), letterSpacing: em(0.25), fontWeight: '700'},
  inputOuter: {marginBottom: em(2), paddingLeft: em(0.66), paddingRight: em(0.66), backgroundColor: 'cornflowerblue'},
  input: { backgroundColor: 'blue', textAlign: 'left'},
  button: { marginTop: 15 },
})

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scratch)
