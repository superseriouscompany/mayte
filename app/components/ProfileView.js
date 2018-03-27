import React, {Component} from 'react'
import moment             from 'moment'
import LinearGradient     from 'react-native-linear-gradient'
import Icon               from 'react-native-vector-icons/Ionicons'
// TODO: rename this to containers/ProfileInfo
import ProfileInfo        from '../containers/ProfileInfo'
import log                from '../services/log'
import {
  NavigationActions
} from 'react-navigation'
import {
  mayteBlack,
  mayteWhite,
} from '../constants/colors'
import {
  screenWidth,
  screenHeight,
  tabNavHeight,
  bottomBoost,
  matchHeaderHeight,
  notchHeight,
  rootNav,
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
    this._maskOp = new Animated.Value(0)
    this.state = {
      open: false,
      mask: false,
    }

    this.linkToInstagram = this.linkToInstagram.bind(this)
    this.incrementMask = this.incrementMask.bind(this)
    this.fadeInMask = this.fadeInMask.bind(this)
    this.fadeOutMask = this.fadeOutMask.bind(this)
  }

  incrementMask(to) {
    Animated.timing(this._maskOp, {
      toValue: to,
      duration: 0,
      useNativeDriver: true,
    }).start()
  }

  fadeInMask() {
    Animated.spring(this._maskOp, {
      toValue: 1,
      stiffness: 200,
      overshootClamping: true,
      useNativeDriver: true,
    }).start()
  }

  fadeOutMask() {
    Animated.spring(this._maskOp, {
      toValue: 0,
      stiffness: 200,
      overshootClamping: true,
      useNativeDriver: true,
    }).start(() => {
      this.setState({mask: false})
    })
  }

  linkToInstagram(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        log(`can't handle url: ${url}`)
      } else {
        Linking.openURL(url)
      }
    })
  }

  render() {
    const { props, state } = this
    return(
      <View style={[styles.container]}>
        <FlatList style={[styles.container, {backgroundColor: mayteBlack()}]}
                  onLayout={(e) => {
                    const {height} = e.nativeEvent.layout
                    return props.viewHeight ? null : props.setHeight(height)
                  }}
                  onMomentumScrollBegin={(e) => {
                    const {contentOffset, layoutMeasurement, contentSize} = e.nativeEvent
                    if (contentOffset.y + layoutMeasurement.height >= contentSize.height) {
                      e.preventDefault()
                      this.info.animateOpen()
                    }
                  }}
                  bounces={true}
                  showsVerticalScrollIndicator={false}
                  pagingEnabled
                  data={props.user.photos.filter(p => !!p && !!p.url) || []}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) =>
                    <Image style={{width: screenWidth, height: props.viewHeight}}
                           resizeMode="cover"
                           source={{url: item.url}} />
                  } />
          { state.mask ?
              <Animated.View
                style={[
                  styles.mask,
                  {opacity: this._maskOp}
                ]} /> : null }
          <ProfileInfo
            setRef={i => this.info = i}
            {...props} {...state}
            style={[styles.infoCont]}
            opacity={this._infoOp}
            incrementMask={this.incrementMask}
            fadeInMask={this.fadeInMask}
            fadeOutMask={this.fadeOutMask}
            maskOn={() => this.setState({mask: true})}
            maskOff={() => this.setState({mask: false})}
            linkToInstagram={this.linkToInstagram}
            setOpen={(boo) => this.setState({
              open: boo,
           })} />

         { props.myProfile || props.hideButtons ? null :
           <TouchableOpacity
             onPress={() => props.navigation.dispatch(NavigationActions.back({key: null}))}
             style={styles.backBtn}>
             <LinearGradient colors={[mayteWhite(0.9), mayteWhite()]} style={styles.backBtnGrad} />
             <Image style={styles.backBtnImg} resizeMode='contain' source={require('../images/x-black.png')} />
           </TouchableOpacity> }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { position: 'relative', width: '100%', height: '100%', },
  mask: { position: 'absolute', top: 0, left: 0, width: screenWidth, height: screenHeight, backgroundColor: mayteBlack(0.9), },
  backBtn: {
    position: 'absolute',
    top: em(1) + notchHeight,
    width: rootNav.toggleWidth,
    height: rootNav.toggleHeight,
    right: em(1),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: rootNav.toggleWidth/2,
  },
  backBtnGrad: {
    position: 'absolute',
    top: 0, left: 0,
    width: rootNav.toggleWidth,
    height: rootNav.toggleHeight,
    borderRadius: rootNav.toggleWidth / 2,
    borderWidth: 1,
    borderColor: mayteBlack(0.1),
    backgroundColor: 'transparent',
  },
  backBtnImg: {
    width: '40%',
    height: '40%',
  },
})
