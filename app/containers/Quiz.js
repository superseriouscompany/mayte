import React, {Component} from 'react'
import {connect} from 'react-redux'
import QuizView from '../components/QuizView'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.quiz.email,
      dob: props.quiz.dob,
      photos: props.quiz.photos || [],
      website: props.quiz.website,
      freeform: props.quiz.freeform,
      step: props.quiz.step,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState != this.state) {
      this.props.setQuiz(this.state)
    }
  }

  render() {
    return <QuizView {...this.props.quiz}
             update={(k) => this.setState(Object.assign({}, this.state, k))} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    quiz: state.quiz,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setQuiz: (k) => dispatch({type: 'quiz:set', quiz: k}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
