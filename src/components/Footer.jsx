import React from 'react'

export default function Footer(props) {
  const totalAnswers = props.countCorrect + props.countIncorrect
  const percentage = totalAnswers > 0 ? Math.round(props.countCorrect / totalAnswers * 100) : 100

  return (
    <div className="footer fixed-bar flex-center">
      <div className="footer--stats-label">Stats:</div>
      <div>
        <span className="footer--checkmark">✓</span>
        <span className="footer--stat">{props.countCorrect}</span>
      </div>
      <div>
        <span className="footer--cross">✗</span>
        <span className="footer--stat">{props.countIncorrect}</span>
      </div>
      <div className="footer--percentage">
        Accuracy: {percentage}%
      </div>
    </div>
  )
}
