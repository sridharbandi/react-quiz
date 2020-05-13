import React, { useContext } from 'react';
import Answer from './Answer';
import Grid from '@material-ui/core/Grid';
import Progress from './Progress';
import Alert from '@material-ui/lab/Alert';
import quizContext from '../context/QuizContext';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { SET_CURRENT_ANSWER, SET_ERROR } from '../reducers/Const';
import ReactHtmlParser from 'react-html-parser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const importAll = require =>
    require.keys().reduce((image, next) => {
        image[next.replace("./", "")] = require(next);
        return image;
    }, {});

const images = importAll(require.context("../img", false, /\.(png|jpe?g|svg)$/));

function Question() {
    const { state, dispatch } = useContext(quizContext);
    const { currentAnswer, currentQuestion, Questions, error } = state;
    const question = Questions[currentQuestion];

    const handleChange = (event) => {
        dispatch({
            type: SET_CURRENT_ANSWER,
            currentAnswer: event.target.value,
        });
        dispatch({ type: SET_ERROR, error: '' });
    };

    return (
        <div className="Questions">
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} md={8} className="Grid-Item">
                    <Progress
                        total={Questions.length}
                        current={currentQuestion + 1}
                    />
                    {error && <Alert className="Alert" severity="error">{error}</Alert>}
                    <FormControl component="fieldset" className="Full-Width">
                        <Typography variant="h4" color="inherit" align="center" className="Text-Color">
                            {question.id}. {ReactHtmlParser(question.question)}
                        </Typography>
                        {question.code &&
                            <div className="Code-Block">
                                <SyntaxHighlighter showLineNumbers language="javascript" style={darcula}>
                                    {question.code.join('\n')}
                                </SyntaxHighlighter>
                            </div>
                        }
                        {question.image &&
                            <img className="Image" alt='' src={images[`${question.image}`]} />}
                        <RadioGroup aria-label="answer" name="answers" value={currentAnswer} onChange={handleChange}>
                            {question.answers.map((a, i) => (
                                <Answer
                                    key={i}
                                    index={a.option}
                                    answer={ReactHtmlParser(a.text)}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}

export default Question;