import React, {Component} from 'react'
import moment             from 'moment'
import LinearGradient     from 'react-native-linear-gradient'
import Icon               from 'react-native-vector-icons/Ionicons'
import {mayteBlack}       from '../constants/colors'
// TODO: rename this to containers/ProfileInfo
import ProfileInfoView    from '../components/ProfileInfoView'
import log                from '../services/log'
import {
  NavigationActions
} from 'react-navigation'
import {
  screenWidth,
  screenHeight,
  tabNavHeight,
  bottomBoost,
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
          <ProfileInfoView
            ref={i => this.info = i}
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

         { props.myProfile ? null :
           <TouchableOpacity
             onPress={() => props.navigation.dispatch(NavigationActions.back({key: null}))}
             style={styles.backBtn}>
           </TouchableOpacity> }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { position: 'relative', width: '100%', height: '100%', },
  mask: { position: 'absolute', top: 0, left: 0, width: screenWidth, height: screenHeight, backgroundColor: mayteBlack(0.9), },
  backBtn: { opacity: 0, position: 'absolute', top: em(1), right: em(1), width: 40, height: 40, backgroundColor: 'seagreen' }
})
