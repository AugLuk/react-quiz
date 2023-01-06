import React from 'react'
import Header from './Header'
import Quiz from './Quiz'
import Footer from './Footer'
import Goodbye from './Goodbye'

export default function App() {
  const [state, setState] = React.useState(
    {
      rounds: undefined,
      isAnsweringPhase: true,
      roundIdx: 0,
      countCorrect: 0,
      countIncorrect: 0,
      isOver: false
    }
  )

  const questionCount = 5
  const dataOverhead = 20

  React.useEffect(() => {
    if (state.rounds === undefined) {
      fetch(`https://the-trivia-api.com/api/questions?limit=${questionCount + dataOverhead}&difficulty=easy`)
        .then(res => res.json())
        .then(data => {
          const rounds = []
          for (let questionIdx = 0, dataIdx = 0; questionIdx < questionCount; questionIdx++, dataIdx++) {
            let question, incorrectAnswers, correctAnswer

            // skip data elements if its question or any of its answers are too long
            outer:
            while (questionCount + dataOverhead - dataIdx > questionCount - questionIdx) {
              question = data[dataIdx].question
              incorrectAnswers = data[dataIdx].incorrectAnswers
              correctAnswer = data[dataIdx].correctAnswer

              if (question.length > 90) {
                dataIdx++
                continue
              }

              for (let incorrectAnswer of incorrectAnswers) {
                if (incorrectAnswer.length > 30) {
                  dataIdx++
                  continue outer
                }
              }

              if (correctAnswer.length > 30) {
                dataIdx++
                continue
              }

              break
            }

            const answers = incorrectAnswers.map((text, idx) => {
              return {
                text: text,
                isChosen: false,
                isCorrect: false
              }
            })

            answers.splice(
              Math.floor(Math.random() * questionCount),
              0,
              {
                text: correctAnswer,
                isChosen: false,
                isCorrect: true
              }
            )
            
            for (let answerIdx = 0; answerIdx < 4; answerIdx++) {
              answers[answerIdx].idx = answerIdx
            }

            rounds.push(
              {
                question: question,
                answers: answers
              }
            )
          }

          setState(prevState => {
            return {
              ...prevState,
              rounds: rounds
            }
          })
        })
    }
  }, [])

  function clickAnswer(idx) {
    setState(prevState => {
      const clickedAnswer = prevState.rounds[prevState.roundIdx].answers[idx]

      clickedAnswer.isChosen = true

      let countCorrect = prevState.countCorrect
      let countIncorrect = prevState.countIncorrect
      if (clickedAnswer.isCorrect) {
        countCorrect++
      } else {
        countIncorrect++
      }

      return {
        ...prevState,
        isAnsweringPhase: false,
        countCorrect: countCorrect,
        countIncorrect: countIncorrect
      }
    })
  }

  function clickNext() {
    setState(prevState => {
      return {
        ...prevState,
        isAnsweringPhase: true,
        roundIdx: prevState.roundIdx + 1,
        isOver: prevState.roundIdx === prevState.rounds.length - 1
      }
    })
  }

  const card = state.rounds !== undefined && (
    state.isOver ?
      <Goodbye />
    :
      <Quiz
        question={state.rounds[state.roundIdx].question}
        isAnsweringPhase={state.isAnsweringPhase}
        questionNumber={state.roundIdx + 1}
        totalQuestions={state.rounds.length}
        answers={state.rounds[state.roundIdx].answers}
        clickAnswer={clickAnswer}
        clickNext={clickNext}
      />
  )
    

  return (
    <div className="app">
      <Header />
      {card}
      <Footer
        countCorrect={state.countCorrect}
        countIncorrect={state.countIncorrect}
      />
    </div>
  )
}
