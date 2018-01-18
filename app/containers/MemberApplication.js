import React, {Component} from 'react'
import {connect} from 'react-redux'
import MemberApplicationView from '../components/MemberApplicationView'

class MemberApplication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      dob: null,
      photos: [],
      website: null,
      freeform: null,
      step: props.user.applyStep,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.step != prevState.step) { this.props.setStep(this.state.step) }
  }

  render() {
    return <MemberApplicationView {...this.props} {...this.state}
             update={(k) => this.setState(Object.assign({}, this.state, k))} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStep: (name) => {
      dispatch({type: 'user:set', user: {
        applyStep: name
      }})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberApplication)
