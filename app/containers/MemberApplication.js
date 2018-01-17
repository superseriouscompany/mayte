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
    }
  }

  render() {
    return <MemberApplicationView {...this.props} {...this.state}
             update={(k) => this.setState(Object.assign(this.state, k))} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberApplication)
