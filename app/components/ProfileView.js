import React, {Component} from 'react'
import moment             from 'moment'
import LinearGradient     from 'react-native-linear-gradient'
import Icon               from 'react-native-vector-icons/Ionicons'
import { mayteBlack }     from '../constants/colors'
import ProfileInfoView    from '../containers/ProfileInfoView'

import {
  screenWidth,
  screenHeight,
  matchHeaderHeight,
  notchHeight,
  em,
} from '../constants/dimensions'
import {
  Animated,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Linking,
  PanResponder,
} from 'react-native'

export default class ProfileView extends Component {
  constructor(props) {
    super(props)

    this.state = {infoOpen: false}

    this.linkToInstagram = this.linkToInstagram.bind(this)
  }

  linkToInstagram(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.error(`can't handle url: ${url}`)
      } else {
        Linking.openURL(url)
      }
    })
  }

  render() {
    const { props, state } = this
    return(
      <View style={[style.container]}>
        <FlatList style={[style.container, {backgroundColor: mayteBlack()}]}
                  onLayout={(e) => {
                    const {height} = e.nativeEvent.layout
                    return props.viewHeight ? null : props.setHeight(height)
                  }}
                  onScroll={(e) => {
                    const {contentOffset, layoutMeasurement, contentSize} = e.nativeEvent
                    if (contentOffset.y + layoutMeasurement.height > contentSize.height) {
                      e.preventDefault()
                      this.setState({infoOpen: true})
                    }
                  }}
                  showsVerticalScrollIndicator={false}
                  pagingEnabled
                  data={props.user.photos || []}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) =>
                    <Image style={{width: screenWidth, height: props.viewHeight}}
                           resizeMode="cover"
                           source={{url: item.url}} />
                  } />
          <ProfileInfoView {...props}
                           style={[style.infoCont]}
                           open={state.infoOpen}
                           setOpen={(boo) => this.setState({infoOpen: boo})}>
            <ScrollView style={[style.infoContent]}
                        scrollEventThrottle={100}
                        scrollEnabled={props.infoOpen ? true : false}>
              <Text style={style.name}>
                {props.user.fullName.split(' ')[0].toUpperCase()}
              </Text>
              <View style={[style.stats, {paddingBottom: props.hideButtons ? em(1) : 0}]}>
                {
                  props.user.dob ?
                  <Text style={style.age}>
                    {moment().diff(moment(props.user.dob, ['MMM Do YYYY']), 'years')}
                  </Text> : null
                }
                <Image style={[style.pin, {marginLeft: props.user.dob ? em(0.66) : 0}]} resizeMode='contain' source={require('../images/pin.png')} />
                <Text style={style.location}>
                  {props.user.distance || 1}
                </Text>
              </View>
              {
                props.hideButtons ? null :
                <View style={[style.tray]}>
                  <TouchableOpacity onPress={() => props.pass(props.user.id)}>
                    <Image style={style.bubble}
                           resizeMode='contain'
                           source={require('../images/x-white.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.like(props.user.id)}>
                    <Image style={style.bubble}
                           resizeMode='contain'
                           source={require('../images/unicorn-white.png')} />
                  </TouchableOpacity>
                </View>
              }
              <View style={style.cv}>
                <TouchableOpacity onPress={() => this.linkToInstagram(`https:\/\/instagram.com/${props.user.instagramHandle || 'treatsmag'}`)}>
                { props.user.instagramHandle ?
                  <Text
                    style={[
                      style.handle,
                      (props.user.instagramHandle.length > 15 ? {
                        fontSize: screenWidth / props.user.instagramHandle.length * 1.2
                      } : {})
                    ]}>
                    @{props.user.instagramHandle}
                  </Text> : null }
                </TouchableOpacity>
                { props.user.occupation ?
                  <Text style={style.occupation}>{(props.user.occupation).toUpperCase()}</Text> : null}
              </View>
              <View>
                <Text style={style.bio}>
                  {props.user.bio || ``}
                </Text>
              </View>
            </ScrollView>
        </ProfileInfoView>
      </View>
    )
  }
}


const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  infoCont: {
    position: 'absolute',
    left: 0,
    width: '100%',
    paddingTop: notchHeight,
  },

  infoContent: {
    minHeight: screenHeight,
  },

  gradient: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    backgroundColor: 'transparent',
  },

  cv: {
    paddingTop: 30,
  },

  handle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    marginBottom: em(0.33),
    fontSize: em(1.66),
    letterSpacing: em(0.1),
    fontFamily: 'Gotham-Book',
  },

  occupation: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
    fontSize: em(1.33),
    letterSpacing: em(0.1),
    fontFamily: 'Gotham-Black',
  },

  bio: {
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    paddingTop: 40,
  },

  name: {
    top: 0, left: 0, right: 0,
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    fontSize: em(1.5),
    fontFamily: 'Futura',
    fontWeight: '700',
    letterSpacing: em(0.1),
    paddingTop: 40,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  age: {
    textAlign: 'center',
    fontSize: em(1.25),
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
  },

  pin: {
    width: em(1),
    height: em(1),
    marginTop: em(0.1),
  },

  location: {
    textAlign: 'center',
    fontSize: em(1.25),
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,1)',
  },

  tray: {
    width: '100%',
    paddingTop: em(1),
    paddingBottom: em(1),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 2,
  },

  bubble: {
    width: em(3),
    height: em(3),
    opacity: 0.9,
    zIndex: 1,
  },

  button: {
    color: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0)',
  },

  decideButton: {
    color: 'white',
  },
})
