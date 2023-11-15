import { FaChevronRight } from "react-icons/fa";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../QuizMarvel";
import QuizOver from "../QuizOver";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useRef, Fragment } from "react";

const styleToast = {
	position: "top-right",
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: false,
};

const levelNames = ["Débutant", "Confirmé", "Expert"];

const Quiz = ({ userData }) => {
	const [quizLevel, setQuizLevel] = useState(0);
	const [maxQuestions, setMaxQuestions] = useState(10);
	const [storedQuestions, setStoredQuestions] = useState();
	const [question, setQuestion] = useState(null);
	const [options, setOptions] = useState([]);
	const [idQuestion, setIdQuestion] = useState(0);
	const [prevStateStored, setPrevStateStored] = useState();
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [userAnswer, setUserAnswer] = useState(null);
	const [score, setScore] = useState(0);
	const [showWelcomeToast, setShowWelcomeToast] = useState(false);
	const [quizEnd, setQuizEnd] = useState(false);
	const [percent, setPercent] = useState(0);
	const storedDataRef = useRef();

	const loadQuestions = (quizz) => {
		const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
		if (fetchedArrayQuiz.length >= maxQuestions) {
			storedDataRef.current = fetchedArrayQuiz;
			const newArray = fetchedArrayQuiz.map(
				({ answer, ...keepRest }) => keepRest
			);
			setStoredQuestions(newArray);
		}
	};

	const showWelcomeMsg = (pseudo) => {
		setShowWelcomeToast(true);
		toast.warn(`Bienvenue ${pseudo}, et bonne chance !`, styleToast);
	};

	useEffect(() => {
		if (userData.pseudo && !showWelcomeToast) {
			showWelcomeMsg(userData.pseudo);
		}
	});

	useEffect(() => {
		loadQuestions(levelNames[quizLevel]);
	}, []);

	useEffect(() => {
		if (quizEnd) {
			const percentScore = getPercentage(maxQuestions, score);
			gameOver(percentScore);
		}
	}, [quizEnd]);

	useEffect(() => {
		if (
			storedQuestions !== undefined &&
			storedQuestions !== prevStateStored
		) {
			setQuestion(storedQuestions[idQuestion].question);
			setOptions(storedQuestions[idQuestion].options);
			setPrevStateStored(storedQuestions);
		}

		if (
			prevStateStored !== undefined &&
			idQuestion !== prevStateStored.idQuestion
		) {
			setQuestion(storedQuestions[idQuestion].question);
			setOptions(storedQuestions[idQuestion].options);
			setPrevStateStored(storedQuestions);
			setUserAnswer(null);
			setBtnDisabled(true);
		}
	}, [storedQuestions, idQuestion]);

	const submitAnswer = (selectedAnswer) => {
		setUserAnswer(selectedAnswer);
		setBtnDisabled(false);
	};

	const displayOptions = options.map((option, index) => {
		return (
			<p
				className={`answerOptions ${
					userAnswer === option ? "selected" : null
				}`}
				key={index}
				onClick={() => submitAnswer(option)}
			>
				<FaChevronRight /> {option}
			</p>
		);
	});

	const getPercentage = (totalQuestions, score) => {
		return (100 / totalQuestions) * score;
	};

	const gameOver = (percentScore) => {
		if (percentScore >= 50) {
			setQuizLevel(quizLevel + 1);
			setPercent(percentScore);
		} else {
			setPercent(percentScore);
		}
	};

	const nextQuestion = () => {
		if (idQuestion === maxQuestions - 1) {
			setTimeout(() => {
				setQuizEnd(true);
			}, 1000);
		} else {
			setIdQuestion((prevState) => prevState + 1);
		}
		// + 1 dans le score
		const goodAnswer = storedDataRef.current[idQuestion].answer;
		if (userAnswer === goodAnswer) {
			setScore((prevState) => prevState + 1);
			toast.success("Wow, Good !", styleToast);
		} else {
			toast.error("Tu sais pas çà ? la honte !", styleToast);
		}
	};

	const loadLevelQuestions = (param) => {
		setQuizLevel(param);
		loadQuestions(levelNames[param]);
		setIdQuestion(0);
		setScore(0);
		setQuizEnd(false);
		setPercent(0);
	};

	return quizEnd ? (
		<QuizOver
			ref={storedDataRef}
			loadLevelQuestions={loadLevelQuestions}
			levelNames={levelNames}
			score={score}
			maxQuestions={maxQuestions}
			quizLevel={quizLevel}
			percent={percent}
		/>
	) : (
		<Fragment>
			<ToastContainer />
			<Levels quizLevel={quizLevel} levelNames={levelNames} />
			<ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions} />
			<h2>{question}</h2>
			{displayOptions}

			<button
				disabled={btnDisabled}
				className="btnSubmit"
				onClick={nextQuestion}
			>
				{idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
			</button>
		</Fragment>
	);
};

export default Quiz;
