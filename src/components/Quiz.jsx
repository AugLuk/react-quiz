import React from 'react'

export default function Quiz(props) {

  const answerComps = props.answers.map(answer => {
    let backgroundColor;
    if (props.isAnsweringPhase) {
      backgroundColor = "darkcyan"
    } else if (answer.isCorrect) {
      backgroundColor = "green"
    } else if (answer.isChosen) {
      backgroundColor = "#d00"
    } else {
      backgroundColor = "gray"
    }

    return (
      <div
        key={answer.idx}
        className="card--answer"
        style={{
          backgroundColor: backgroundColor,
          cursor: props.isAnsweringPhase ? "pointer" : "default"
        }}
        onClick={props.isAnsweringPhase ? () => {props.clickAnswer(answer.idx)} : null}
      >
        {answer.text}
      </div>
    )
    })

  return (
    <div className='main-container flex-center'>
      <div className="card flex-center">
          <h1 className="card--title">
            Question {props.questionNumber} / {props.totalQuestions}
          </h1>
          <div className="card--question-container flex-center">
            <h2 className="card--question">
              {props.question}
            </h2>
          </div>
          {answerComps}
      </div>
      <div
        className="bottom-button"
        style={{visibility: props.isAnsweringPhase ? "hidden" : "visible"}}
        onClick={props.clickNext}
      >
        {props.questionNumber === props.totalQuestions ? "Finish" : "Next"}
      </div>
    </div>
  )
}
