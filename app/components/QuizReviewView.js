'use strict'

import React, {Component}                           from 'react'
import DatePicker                                   from 'react-native-datepicker'
import {Scene}                                      from './QuizView'
import ImagePicker                                  from 'react-native-image-crop-picker'
import {ButtonGrey}                                 from './Button'
import {mayteWhite, mayteBlack}                     from '../constants/colors'
import {em, screenWidth, screenHeight, notchHeight} from '../constants/dimensions'
import api                                          from '../services/api'
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class Photos extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const {props, state} = this
    return (
      <Scene
        style={[style.container, {height: 'auto'}]}
        contStyle={{justifyContent: 'flex-start', paddingTop: em(3) + notchHeight, paddingBottom: em(3)}}
        active={props.step == 'review'}
        onFadeIn={() => {
          if (props.photos.filter(i => i).length) {
            this.setState({ready: true})
          }
        }}>
        <Text style={[style.text, style.header]}>REVIEW</Text>

        <View style={[style.section]}>
          <View style={style.sectionHeader}>
            <Text style={[style.text, style.sectionTitle]}>EMAIL</Text>
            <TouchableOpacity
              style={[style.editBtn]}
              onPress={() => props.update({step: 'email'})}
              hitSlop={{top: -20, bottom: -20, left: -20, right: -20,}}>
              <Image
                style={[
                  style.editIcon,
                ]}
                source={require('../images/edit-white.png')}
                resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <Text style={[style.text, style.valueText]}>{props.email}</Text>
        </View>

        <View style={[style.section]}>
          <View style={style.sectionHeader}>
            <Text style={[style.text, style.sectionTitle]}>DATE OF BIRTH</Text>
            <TouchableOpacity
              style={[style.editBtn]}
              onPress={() => props.update({step: 'dob'})}
              hitSlop={{top: -20, bottom: -20, left: -20, right: -20,}}>
              <Image
                style={[
                  style.editIcon,
                ]}
                source={require('../images/edit-white.png')}
                resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <Text style={[style.text, style.valueText]}>{props.dob}</Text>
        </View>

        <View style={[style.section]}>
          <View style={style.sectionHeader}>
            <Text style={[style.text, style.sectionTitle]}>WEBSITE</Text>
            <TouchableOpacity
              style={[style.editBtn]}
              onPress={() => props.update({step: 'website'})}
              hitSlop={{top: -20, bottom: -20, left: -20, right: -20,}}>
              <Image
                style={[
                  style.editIcon,
                ]}
                source={require('../images/edit-white.png')}
                resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <Text style={[style.text, style.valueText]}>{props.website}</Text>
        </View>

        <View style={[style.section]}>
          <View style={style.sectionHeader}>
            <Text style={[style.text, style.sectionTitle]}>PHOTOS</Text>
            <TouchableOpacity
              style={[style.editBtn]}
              onPress={() => props.update({step: 'photos'})}
              hitSlop={{top: -20, bottom: -20, left: -20, right: -20,}}>
              <Image
                style={[
                  style.editIcon,
                ]}
                source={require('../images/edit-white.png')}
                resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <View style={style.slots}>
          {
            props.photos.filter(p => p).map((p, i) => {
              return(
                <View style={style.slot} key={i}>
                  <View style={style.slotBg}><Text style={[style.text, {fontSize: em(2)}]}>+</Text></View>
                  { props.photos[i] ?
                      <Image style={style.slotImg} source={{uri: props.photos[i]}} resizeMode='cover' /> : null }
                </View>
              )
            })
          }
          </View>
        </View>

        <View style={[style.section]}>
          <View style={style.sectionHeader}>
            <Text style={[style.text, style.sectionTitle]}>BELIEVE IN MAGIC?</Text>
            <TouchableOpacity
              style={[style.editBtn]}
              onPress={() => props.update({step: 'freeform'})}
              hitSlop={{top: -20, bottom: -20, left: -20, right: -20,}}>
              <Image
                style={[
                  style.editIcon,
                ]}
                source={require('../images/edit-white.png')}
                resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <Text style={[style.text, style.valueText]}>{props.freeform}</Text>
        </View>

        <Animated.View>
          <ButtonGrey
            style={{paddingLeft: em(2), paddingRight: em(2)}}
            onPress={props.submit}
            text='Submit' />
        </Animated.View>
      </Scene>
    )
  }
}

const slotWidth = em(4)

const style = StyleSheet.create({
  container: {paddingRight: em(1), paddingLeft: em(1)},
  text: {backgroundColor: 'transparent', color: mayteWhite(), textAlign: 'center', fontFamily: 'Futura'},
  header: {fontSize: em(2), marginBottom: em(2), letterSpacing: em(0.25), fontWeight: '700'},
  sectionHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: em(0.66),},
  sectionTitle: {fontSize: em(1.33), textAlign: 'left', fontWeight: '700', letterSpacing: em(0.133)},
  editBtn: {width: em(2), height: em(2), marginLeft: em(0.66)},
  editIcon: {width: '100%', height: '100%',},
  valueText: {fontFamily: 'Gotham-Book', textAlign: 'left', fontSize: em(1.33)},
  body: {fontSize: em(1.2), marginBottom: em(3)},
  slots: {flexDirection: 'row', marginTop: em(0.66), width: slotWidth * 3.66, justifyContent: 'space-between'},
  slot: {width: slotWidth, height: slotWidth * 1.5, borderWidth: 1, borderColor: mayteWhite(0.33), borderRadius: em(0.5), backgroundColor: mayteBlack(0.5)},
  slotBg: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'},
  slotImg: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: em(0.5)},
  section: {width: '100%', marginBottom: em(2)},
})
