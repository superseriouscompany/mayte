'use strict'

import React, {Component}       from 'react'
import DatePicker               from 'react-native-datepicker'
import {Scene}                  from './QuizView'
import ImagePicker              from 'react-native-image-crop-picker'
import {ButtonGrey}             from './Button'
import OrbitLoader              from './OrbitLoader'
import {mayteWhite, mayteBlack} from '../constants/colors'
import api                      from '../services/api'
import CheckBox                 from 'react-native-check-box'
import {
  em,
  screenWidth,
  screenHeight,
  notchHeight
} from '../constants/dimensions'
import {
  View,
  Text,
  Image,
  Easing,
  Linking,
  Animated,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

const submitLoaderRadius = em(1)

export default class QuizReviewView extends Component {
  render() {
    const {props, state} = this
    return (
      <Scene
        style={[style.container]}
        contStyle={{justifyContent: 'flex-start' }}
        ref={el => this.scene = el}>

        <ScrollView
          showVerticalScrollIndicator={false}
          contentContainerStyle={style.scrollCnr}
          style={{flex: 1, width: '100%'}}>

          <Text style={[style.text, style.header]}>REVIEW</Text>

          <View style={[style.section]}>
            <View style={style.sectionHeader}>
              <Text style={[style.text, style.sectionTitle]}>EMAIL</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.scene.fadeOut(() => props.update({step: 'email'}))}>
              <Text style={[style.text, style.valueText]}>{props.email}</Text>
            </TouchableOpacity>
          </View>

          <View style={[style.section]}>
            <View style={style.sectionHeader}>
              <Text style={[style.text, style.sectionTitle]}>DATE OF BIRTH</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.scene.fadeOut(() => props.update({step: 'dob'}))}>
              <Text style={[style.text, style.valueText]}>{props.dob}</Text>
            </TouchableOpacity>
          </View>

          <View style={[style.section]}>
            <View style={style.sectionHeader}>
              <Text style={[style.text, style.sectionTitle]}>WEBSITE</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.scene.fadeOut(() => props.update({step: 'website'}))}>
              <Text style={[style.text, style.valueText]}>{props.website}</Text>
            </TouchableOpacity>
          </View>

          <View style={[style.section]}>
            <View style={style.sectionHeader}>
              <Text style={[style.text, style.sectionTitle]}>PHOTOS</Text>
            </View>
            <View style={style.slots}>
            {
              props.photos.map((p, i) => {
                return(
                  <TouchableOpacity style={style.slot} key={i} onPress={() => this.scene.fadeOut(() => props.update({step: 'photos'}))}>
                    <View style={style.slotBg}><Text style={[style.text, {fontSize: em(2)}]}>+</Text></View>
                    { props.photos[i] ?
                        <Image style={style.slotImg} source={{uri: props.photos[i].url}} resizeMode='cover' /> : null }
                  </TouchableOpacity>
                )
              })
            }
            </View>
          </View>

          <View style={[style.section]}>
            <View style={style.sectionHeader}>
              <Text style={[style.text, style.sectionTitle]}>MAGIC?</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.scene.fadeOut(() => props.update({step: 'freeform'}))}>
              <Text style={[style.text, style.valueText]}>{props.freeform}</Text>
            </TouchableOpacity>
          </View>

          <View style={[style.section]}>
            <View style={style.sectionHeader}>
              <Text style={[style.text, style.sectionTitle]}>VIP CODE</Text>
            </View>
            <TouchableOpacity
              disabled={!!props.quiz.referer}
              onPress={() => this.scene.fadeOut(() => props.update({step: 'vip'}))}>
              { props.quiz.vipCode ?
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={style.vipRefBubble} source={{url: props.quiz.referer.imageUrl}} resizeMode='cover' />
                    <Text style={[style.text, style.valueText]}>{props.quiz.vipCode}</Text>
                  </View>
                : <Text style={[style.text, style.valueText, style.vipPlaceholder]}>Enter Code</Text>
              }
            </TouchableOpacity>
          </View>

          <View style={[style.section, style.tosCnr]}>
            <CheckBox
              onClick={props.toggleTerms}
              isChecked={props.terms}
              checkBoxColor={mayteWhite()}
              style={{alignItems: 'center', justifyContent: 'center'}}
              rightTextView={
                <Text style={[style.text, style.valueText, style.tosText]}>
                  I accept the{" "}
                  <TouchableOpacity onPress={() => Linking.openURL('https://dateunicorn.com/terms')} style={style.tosLinkCnr}>
                    <Text style={[style.text, style.valueText, style.tosLink]}>Terms of Service</Text>
                  </TouchableOpacity>
                </Text>
              }
              />
          </View>


          { props.submitting || props.photosLoading ?
            <View style={style.loadingCnr}>
              <OrbitLoader
                color={mayteWhite()}
                radius={submitLoaderRadius}
                orbRadius={submitLoaderRadius/4} />
              { !props.photosLoading ? null :
                <Text style={style.loadingExplanation}>
                  Uploading Photos...
                </Text>
              }
            </View>
          : !!props.terms ?
            <Animated.View>
              <ButtonGrey
                style={{paddingLeft: em(2), paddingRight: em(2)}}
                onPress={props.submit}
                text='Submit' />
            </Animated.View>
          :
            null
          }
        </ScrollView>
      </Scene>
    )
  }
}

const slotWidth = em(4)

const style = StyleSheet.create({
  container: {paddingRight: em(1.33), paddingLeft: em(1.33)},
  text: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  header: {fontSize: em(1.66), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  sectionHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: em(0.66),},
  sectionTitle: {fontSize: em(.8), textAlign: 'left', fontWeight: '700', letterSpacing: em(0.133)},
  editBtn: {width: em(2), height: em(2), marginLeft: em(0.66)},
  editIcon: {width: '100%', height: '100%',},
  valueText: {fontFamily: 'Gotham-Book', textAlign: 'left', fontSize: em(1.33)},
  body: {fontSize: em(1.2), marginBottom: em(3)},
  slots: {flexDirection: 'row', marginTop: em(0.66), width: slotWidth * 3.66, justifyContent: 'space-between'},
  slot: {width: slotWidth, height: slotWidth * 1.5, borderWidth: 1, borderColor: mayteWhite(0.33), borderRadius: em(0.5), backgroundColor: mayteBlack(0.5)},
  slotBg: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'},
  slotImg: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: em(0.5)},
  section: {width: '100%', marginBottom: em(2)},
  loadingCnr: {alignItems: 'center', },
  loadingExplanation: { color: mayteWhite(), backgroundColor: 'transparent', marginTop: em(1), },
  vipPlaceholder: {fontStyle: 'italic', opacity: 0.8},
  vipDisclaimer: {textAlign: 'left', marginTop: em(0.66)},
  vipRefBubble: {width: em(2), height: em(2), borderRadius: em(1), marginRight: em(0.66)},
  tosCnr: { },
  tosText: {  marginTop: 5, fontSize: em(1), marginLeft: em(0.66) },
  tosLinkCnr: { width: em(8.5), height: em(1), },
  tosLink: { textDecorationLine: 'underline', fontSize: em(1)},
  scrollCnr: { paddingTop: em(2) + notchHeight, paddingBottom: em(4), alignItems: 'center', width: '100%' },
})
