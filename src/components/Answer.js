import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

function Answer(props) {

    return (
        <Paper elevation={0} className="Paper">
            <FormControlLabel className="Full-Width" value={props.index} control={<Radio color="primary" />} label={props.answer} />
        </Paper>
    );
}

export default Answer;