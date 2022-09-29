import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Failed } from './../../assets/icons';

const CityReservationFailed = ({ setActiveStep }) => {
    return (
        <Grid container direction='column' spacing={1} justify='center' alignItems='center' style={{ height: '80vh' }}>
            <Grid item>
                <Failed />
            </Grid>
            <Grid item>
                <Typography variant='body2'>Failed</Typography>
            </Grid>
            <Grid item>
                <Typography>Path is not possible</Typography>
            </Grid>
            <Grid item>
                <Typography>Please, check your path and</Typography>
            </Grid>
            <Grid item>
                <Typography>change the destination</Typography>
            </Grid>
            <Grid item>
                <Button color='primary' variant='contained' onClick={() => setActiveStep(0)}>Back</Button>
            </Grid>
        </Grid>
    )
}

export default CityReservationFailed
