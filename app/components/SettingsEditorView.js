import React, { Component } from 'react'
import moment from 'moment'
import { mayteBlack } from '../constants/colors'
import DatePicker from 'react-native-datepicker'
import {
  em,
  statusBarHeight,
  screenWidth,
} from '../constants/dimensions'
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Switch,
  Image,
  View,
  Text,
} from 'react-native'

export default (props) => {
  const oldest   = moment().subtract(100, 'years')
  const youngest = moment().subtract(18, 'years')
  const maxDob   = `${oldest.year()}-${oldest.month()}-${oldest.date()}`
  const minDob   = `${youngest.year()}-${youngest.month()}-${youngest.date()}`

  return(
    <ScrollView style={[style.container, {backgroundColor: mayteBlack()}]}>
      <View style={[style.header, style.padded]}>
        <TouchableOpacity>
          <Text style={[style.headerBtn]}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[style.headerBtn]}>SAVE</Text>
        </TouchableOpacity>
      </View>

      {/* PHOTOS */}
      <View>
        <View style={[style.padded]}>
          <View style={[style.sectionHeader]}>
            <Text style={[style.sectionHeaderLabel]}>PHOTOS</Text>
            <Text style={[style.sectionHeaderSublabel]}>{props.user.photos.length}/10</Text>
          </View>
          <View style={[style.currentPhotos]}>
          {
            props.user.photos.map((p,i) => {
              return(
                <Image style={style.currentPhotosImg} key={i} source={{uri: p.url}} />
              )
            })
          }
          </View>
        </View>

        <View>
          <Text style={{textAlign: 'center', color: 'white'}}>
            SELECT FROM INSTAGRAM
          </Text>
          <ScrollView horizontal={true}>
            <View>
              <View style={style.photoSelect}>
              {
                (props.user.availablePhotos.filter((p,i) => i%2===0) || []).map((p,i) => {
                  return <Image key={i}
                                style={[style.photoSelectImg]}
                                resizeMode="cover"
                                source={{url: p.image.url}} />
                })
              }
              </View>
              <View style={style.photoSelect}>
              {
                (props.user.availablePhotos.filter((p,i) => i%2===1) || []).map((p,i) => {
                  return <Image key={i}
                                style={[style.photoSelectImg]}
                                resizeMode="cover"
                                source={{url: p.image.url}} />
                })
              }
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={{textAlign: 'center', color: 'white'}}>
            SELECT FROM CAMERA ROLL
          </Text>
          <TouchableOpacity>
            <View style={[style.cameraRollBtn]}>
              <Text style={{fontSize: em(1.5), color: 'white', height: em(2)}}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>


      {/* INFO */}
      <View style={[style.padded]}>
        <View style={[style.sectionHeader]}>
          <Text style={[style.sectionHeaderLabel]}>BIO</Text>
          <Text style={[style.sectionHeaderSublabel]}>{props.user.bio.length}/500</Text>
        </View>
        <TextInput style={[style.bioInput]}
                   multiline={true}
                   maxLength={500}
                   defaultValue={props.user.bio || 'Sample bio text'}
                   onChangeText={text => {
                     // Goal is to have timeout here a la:
                     //   cancelTimeout(this.bioTimeout)
                     //   this.bioTimeout = setTimeout(() => props.updateBio(text), 500)
                     // props.updateBio(text)
                   }}></TextInput>

        <View style={[style.sectionHeader]}>
          <Text style={[style.sectionHeaderLabel]}>BIRTHDATE</Text>
        </View>
        <DatePicker style={[style.dobInput]}
                    date={props.user.dob}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate={minDob}
                    maxDate={maxDob}
                    showIcon={false}
                    confirmBtnText="confirm"
                    cancelBtnText="cancel"
                    onDateChange={null/*date => props.setDob(date)*/} />

        <View style={[style.sectionHeader]}>
          <Text style={[style.sectionHeaderLabel]}>OCCUPATION</Text>
        </View>
        <TextInput style={style.occupationInput}
                   defaultValue={props.user.occupation || 'Professional'}
                   onChangeText={text => {

                   }}/>
      </View>

      {/* OPTIONS */}
      <View style={[style.padded]}>
      {
        props.options.map((o,i) => {
          return(
            <View style={[style.option]}>
              <Text style={style.optionLabel}>{o.label}</Text>
              <Switch value={true} onValueChange={o.action}></Switch>
            </View>
          )
        })
      }
      </View>


      <View style={style.centered}>
        <TouchableOpacity onPress={props.viewProfile}>
          <Text style={[style.text]}>View Profile</Text>
        </TouchableOpacity>
        <Text style={[style.text]}>Editor</Text>
        <TouchableOpacity onPress={props.viewPreferences}>
          <Text style={[style.text]}>View Preferences</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: statusBarHeight + em(1),
    marginBottom: em(2),
  },
  headerBtn: {
    color: 'white',
    fontSize: em(1),
  },
  padded: {
    paddingLeft: em(1),
    paddingRight: em(1),
  },
  sectionHeader: {
    paddingBottom: em(0.66),
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionHeaderLabel: {
    color: 'white',
    fontWeight: '700',
    fontSize: em(1.33),
  },
  sectionHeaderSublabel: {
    color: 'white',
    marginLeft: em(0.66),
  },


  currentPhotos: {
    flexDirection: 'row',
  },
  currentPhotosImg: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: em(0.33),
    marginRight: em(0.33),
  },


  photoSelect: {
    flexDirection: 'row',
    paddingLeft: em(1),
  },
  photoSelectImg: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: em(0.33),
    marginBottom: em(0.33),
    marginRight: em(0.33),
  },

  cameraRollBtn: {
    width: em(3),
    height: em(3),
    borderRadius: em(1.5),
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bioInput: {
    backgroundColor: 'white',
    fontSize: em(1),
    minHeight: em(8),
    padding: em(1),
    paddingTop: em(0.66),
    paddingBottom: em(0.66),
    borderRadius: em(0.33),
    marginBottom: em(1),
  },

  dobInput: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: em(1),
  },

  occupationInput: {
    backgroundColor: 'white',
    borderRadius: em(0.33),
    padding: em(1),
    paddingTop: em(0.66),
    paddingBottom: em(0.66),
    textAlign: 'center',
    marginBottom: em(2),
  },


  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: em(1),
  },
  optionLabel: {
    color: 'white',
    fontSize: em(1.33),
    fontWeight: 'bold',
  },
  optionSwitch: {},
})
