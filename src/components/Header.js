import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const header = () => (
    <AppBar elevation={0} position='sticky' color='primary'>
        <Toolbar>
            <Typography variant="h5" color="inherit" className="Text">
                Be An Expert - Quiz
            </Typography>
        </Toolbar>
    </AppBar>
);

export default header;