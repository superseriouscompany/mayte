import React, {Component} from 'react'
import moment             from 'moment'
import LinearGradient     from 'react-native-linear-gradient'
import Icon               from 'react-native-vector-icons/Ionicons'
import {mayteBlack}       from '../constants/colors'
import ProfileInfoView    from '../containers/ProfileInfoView'

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

    this.state = {infoOpen: false, infoPermission: true}

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
          <ProfileInfoView
            {...props}
            style={[style.infoCont]}
            open={state.infoOpen}
            linkToInstagram={this.linkToInstagram}
            setOpen={(boo) => this.setState({
              infoOpen: boo,
              infoPermission: true,
           })} />
      </View>
    )
  }
}


const style = StyleSheet.create({
  container: {
    flex: 1
  },
  
  gradient: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
})
