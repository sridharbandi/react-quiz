import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class homepage extends Component {
    render() {
        return (
            <React.Fragment>
                <Typography variant="h3" color="inherit" align="center" className="Text-Color">
                    Hello, Welcome!<br></br>
                    Test your knowledge
            </Typography>
                <Grid container justify="center">
                    <Button variant="contained" color="primary" size="large" disableElevation>
                        Start the Quiz!
                    </Button>
                </Grid>

            </React.Fragment>
        );
    }
}
export default homepage;