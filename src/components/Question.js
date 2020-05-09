import React, { useContext } from 'react';
import Answer from './Answer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import quizContext from '../context/QuizContext';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { SET_CURRENT_ANSWER, SET_ERROR } from '../reducers/Const';

function Question() {
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
        <Card className="Card">
            <CardContent>
                <FormControl component="fieldset">
                    <Typography variant="h4" color="inherit" align="center" className="Text-Color">
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
            </CardContent>
        </Card>
    );
}

export default Question;