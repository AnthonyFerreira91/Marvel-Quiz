import React from 'react'

const ProgressBar = ({ idQuestion, maxQuestions }) => {

	const actualQuestion = idQuestion + 1;

	const getProgressPercent = (totalQuestions, questionActual) => {
		return (100 / totalQuestions) * questionActual;
	}

	const progressPercent = getProgressPercent(maxQuestions, actualQuestion);

  	return (
		<>
			<div className='percentage'>
				<div className="progressPercent">{`Question: ${actualQuestion}/${maxQuestions}`}</div>
				<div className="progressPercent">{`Progréssion: ${progressPercent}%`}</div>
			</div>
			<div className="progressBar">
				<div className="progressBarChange" style={{width: `${progressPercent}%`}}></div>
			</div>
		</>	
  	)
}

export default React.memo(ProgressBar)