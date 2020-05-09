
import './App.css';
import React, { useReducer } from 'react';
import Header from './components/Header';
import Progress from './components/Progress';
import Question from './components/Question';
import QuizContext from './context/QuizContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';


import {
  SET_ANSWERS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
  RESET_QUIZ,
} from './reducers/Const';
import quizReducer from './reducers/QuizReducer';

function App() {
  const questions = [
    {
      id: 1,
      question: 'Which statement about Hooks is not true?',
      answers: [
        { option: 'a', text: 'Hooks are 100% backwards-compatible and can be used side by side with classes' },
        { option: 'b', text: 'Hooks are still in beta and not available yet' },
        { option: 'c', text: "Hooks are completely opt-in, there's no need to rewrite existing code" },
        { option: 'd', text: 'All of the above' }],
      correct_answer: 'b',
    },
    {
      id: 2,
      question: 'Which one is not a Hook?',
      answers: [
        { option: 'a', text: 'useState()' },
        { option: 'b', text: 'useConst()' },
        { option: 'c', text: 'useReducer()' },
        { option: 'd', text: 'All of the above' }],
      correct_answer: 'b',
    },
    {
      id: 3,
      question: 'What Hook should be used for data fetching?',
      answers: [
        { option: 'a', text: 'useDataFetching()' },
        { option: 'b', text: 'useApi()' },
        { option: 'c', text: 'useEffect()' },
        { option: 'd', text: 'useRequest()' }],
      correct_answer: 'c',
    },
  ];

  const initialState = {
    questions,
    currentQuestion: 0,
    currentAnswer: '',
    answers: [],
    correctAnswers: [],
    showResults: false,
    showHomepage: true,
    error: '',
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { correctAnswers, currentQuestion, currentAnswer, answers, showResults, showHomepage, error } = state;

  const question = questions[currentQuestion];

  const renderError = () => {
    if (!error) {
      return;
    }

    return <Alert className="Alert" severity="error">{error}</Alert>;
  };

  const renderResultMark = (question, answer) => {
    if (question.correct_answer === answer.answer) {
      return <CheckIcon style={{ color: green[500] }} />;
    }

    return <CloseIcon color="secondary" />;
  };

  const renderResultsData = () => {
    return answers.map(answer => {
      const question = questions.find(
        question => question.id === answer.questionId
      );

      return (
        <Typography variant="body1" color="inherit" className="Text-Color" key={question.id}>
          {renderResultMark(question, answer)} {question.question}
        </Typography>
      );
    });
  };

  const restart = () => {
    dispatch({ type: RESET_QUIZ });
  };

  const next = () => {
    const answer = { questionId: question.id, answer: currentAnswer };

    if (!currentAnswer) {
      dispatch({ type: SET_ERROR, error: 'Please select an option' });
      return;
    }

    if (question.correct_answer === currentAnswer) {
      correctAnswers.push(answer);
    }
    answers.push(answer);
    dispatch({ type: SET_ANSWERS, answers });
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' });

    if (currentQuestion + 1 < questions.length) {
      setTimeout(function () {
        dispatch({
          type: SET_CURRENT_QUESTION,
          currentQuestion: currentQuestion + 1,
        });
      }, 200);

      return;
    }

    dispatch({ type: SET_SHOW_RESULTS, showResults: true });
  };

  if (showHomepage) {
    return (
      <React.Fragment>
        <Header />
        <Typography variant="h3" color="inherit" align="center" className="Text-Color">
          Hello, Welcome!<br></br>
              Test your knowledge
      </Typography>
        <Grid container justify="center">
          <Button variant="contained" color="primary" onClick={restart} size="large" disableElevation>
            Start the Quiz!
              </Button>
        </Grid>

      </React.Fragment>
    );
  }
  else if (showResults) {
    return (
      <React.Fragment>
        <Header />
        <Typography variant="h3" color="inherit" align="center" className="Text-Color">
          You got {((correctAnswers.length / answers.length) * 100).toFixed(1)}%<Typography variant="caption" color="inherit" align="center" className="Text-Color">({correctAnswers.length} of {answers.length})</Typography> of the questions correct!
        </Typography>
        <Typography variant="button" color="inherit" align="center" className="Text-Color">
          Results
        </Typography>
        <ul>{renderResultsData()}</ul>
        <Grid container justify="center">
          <Button variant="contained" onClick={restart} color="primary" size="large" disableElevation>
            Try Again?
            </Button>
        </Grid>
      </React.Fragment>
    );
  } else {
    return (
      <QuizContext.Provider value={{ state, dispatch }}>
        <React.Fragment>
          <Header />
          <Progress
            total={questions.length}
            current={currentQuestion + 1}
          />
          <Question />
          {renderError()}
          <Grid container justify="center">
            <Button variant="contained" onClick={next} color="primary" size="large" disableElevation>
              Confirm and Continue
            </Button>
          </Grid>
        </React.Fragment>
      </QuizContext.Provider>
    );
  }
}

export default App;