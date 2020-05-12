import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Progress(props) {
    return (
        <Grid container justify="flex-end">
            <Typography variant="h6" color="inherit" align="center" className="Text-Color">
                Question {props.current} of {props.total}
            </Typography>
        </Grid>
    );
}

export default Progress;