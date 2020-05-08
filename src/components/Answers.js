import React, { useContext } from 'react';
import Answer from './Answer';
import quizContext from '../context/QuizContext';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { SET_CURRENT_ANSWER, SET_ERROR } from '../reducers/Const';

function Answers() {
    const { state, dispatch } = useContext(quizContext);
    const { currentAnswer, currentQuestion, questions } = state;
    const question = questions[currentQuestion];

    const handleChange = (event) => {
        dispatch({
            type: SET_CURRENT_ANSWER,
            currentAnswer: event.target.value,
        });
        dispatch({ type: SET_ERROR, error: '' });
    };

    return (
        <FormControl component="fieldset">
            <Typography variant="h3" color="inherit" align="center" className="Text-Color">
                {question.question}
            </Typography>
            <RadioGroup aria-label="answer" name="answers" value={currentAnswer} onChange={handleChange}>
                {question.answers.map((a, i) => (
                    <Answer
                        key={i}
                        index={a.option}
                        answer={a.text}
                    />
                ))}
            </RadioGroup>
        </FormControl>
        /* <Answer
            letter="a"
            answer={question.answer_a}
            dispatch={dispatch}
            selected={currentAnswer === 'a'}
        />
        <Answer
            letter="b"
            answer={question.answer_b}
            dispatch={dispatch}
            selected={currentAnswer === 'b'}
        />
        <Answer
            letter="c"
            answer={question.answer_c}
            dispatch={dispatch}
            selected={currentAnswer === 'c'}
        />
        <Answer
            letter="d"
            answer={question.answer_d}
            dispatch={dispatch}
            selected={currentAnswer === 'd'}
        /> */
    );
}

export default Answers;