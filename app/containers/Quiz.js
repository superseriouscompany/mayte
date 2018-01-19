import React, {Component} from 'react'
import {connect} from 'react-redux'
import QuizView from '../components/QuizView'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.quiz.email,
      dob: props.quiz.dob,
      photos: props.quiz.photos || [null, null, null],
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
    return <QuizView {...this.props.quiz} user={this.props.user}
             update={(k) => this.setState(Object.assign({}, this.state, k))}
             readyForSubmit={
               this.props.quiz.email &&
               this.props.quiz.dob &&
               this.props.quiz.photos.filter(i => i).length &&
               this.props.quiz.website &&
               this.props.quiz.freeform
             } />
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
