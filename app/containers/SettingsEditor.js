import React, { Component } from 'react'
import { mayteBlack } from '../constants/colors'
import {
  em,
  statusBarHeight,
  screenWidth,
} from '../constants/dimensions'
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  View,
  Text,
} from 'react-native'

export default class SettingsEditor extends Component {
  render() {
    const { props, state } = this
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

        <View>
          <View style={[style.padded]}>
            <View style={[style.sectionHeader, {flexDirection: 'row'}]}>
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
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: mayteBlack(),
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
  }
})
