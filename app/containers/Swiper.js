import React, { PureComponent } from 'react'
import RNSwiper from 'react-native-swiper'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Swiper = (props) => {
  return(
    <RNSwiper
      {...props}
      onIndexChanged={(index) => props.onIndexChanged(index)} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIndexChanged: (index) => {
      console.log("index changed", index)
      dispatch({type: 'scene:change', scene: index})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Swiper)
