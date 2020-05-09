import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

function Answer(props) {

    return (
        <FormControlLabel value={props.index} control={<Radio color="primary"/>} label={props.answer} />
    );
}

export default Answer;