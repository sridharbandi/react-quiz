
import './App.css';
import React, { useReducer } from 'react';
import Progress from './components/Progress';
import Answers from './components/Answers';
import QuizContext from './context/QuizContext';

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
    showResults: false,
    error: '',
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { currentQuestion, currentAnswer, answers, showResults, error } = state;

  const question = questions[currentQuestion];

  const renderError = () => {
    if (!error) {
      return;
    }

    return <div className="error">{error}</div>;
  };

  const renderResultMark = (question, answer) => {
    if (question.correct_answer === answer.answer) {
      return <span className="correct">Correct</span>;
    }

    return <span className="failed">Failed</span>;
  };

  const renderResultsData = () => {
    return answers.map(answer => {
      const question = questions.find(
        question => question.id === answer.questionId
      );

      return (
        <div key={question.id}>
          {question.question} - {renderResultMark(question, answer)}
        </div>
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

    answers.push(answer);
    dispatch({ type: SET_ANSWERS, answers });
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' });

    if (currentQuestion + 1 < questions.length) {
      dispatch({
        type: SET_CURRENT_QUESTION,
        currentQuestion: currentQuestion + 1,
      });
      return;
    }

    dispatch({ type: SET_SHOW_RESULTS, showResults: true });
  };

  if (showResults) {
    return (
      <div className="container results">
        <h2>Results</h2>
        <ul>{renderResultsData()}</ul>
        <button className="btn btn-primary" onClick={restart}>
          Restart
            </button>
      </div>
    );
  } else {
    return (
      <QuizContext.Provider value={{ state, dispatch }}>
        <div className="container">
          <Progress
            total={questions.length}
            current={currentQuestion + 1}
          />
          {renderError()}
          <Answers />
          <button className="btn btn-primary" onClick={next}>
            Confirm and Continue
                </button>
        </div>
      </QuizContext.Provider>
    );
  }
}

export default App;