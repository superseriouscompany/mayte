import React, { Component } from 'react'
import RangeSliderView from '../components/RangeSliderView.js'

class RangeSlider extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props, state } = this
    return(
      <RangeSliderView {...props} />
    )
  }
}

RangeSlider.defaultProps = {
  onUpdate: (vals) => null,
  minValue: 0,
  maxValue: 0,
  numMarkers: 2,
  values: [0,0],
  trackHeight: 3,
  markerDiameter: 20,
  trackColor: '#000',
  markerFill: '#000',
  markerStroke: '#000',
  markerStrokeWidth: 0,
}

export default RangeSlider
