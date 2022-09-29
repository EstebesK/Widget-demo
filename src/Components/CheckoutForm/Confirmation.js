import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { Success } from '../../assets/icons';
import { logOut } from './../../Redux/form-reducer';


const Confirmation = ({ companyName, email, setExpanded, setActiveStep, logOut }) => {

    return (
        <>
            <Grid container direction="column" spacing={2} justify='center' alignItems='center' style={{ height: '80vh' }}>
                <Grid item>
                    <Success />
                </Grid>
                <Grid item>
                    <Typography variant='body2'>Success</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body2' align='center'>Your reservation was successfully <Typography variant='body2' >submitted. A confirmation email was</Typography> sent to {email && email}.</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body2'>Thanks, {companyName && companyName}</Typography>
                </Grid>
                <Grid item>
                    <Button onClick={() => { setExpanded(false); setActiveStep(0); logOut() }} variant='contained' color='primary' fullWidth>Done</Button>
                </Grid>
            </Grid>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isSuccess: state.companyProfile.isSuccess,
        isFetching: state.cars.isFetching,
        formSummary: state.formData,
        email: state.formData.client.email,
        companyName: state.companyProfile.profile.companyName
    }
}

export default connect(mapStateToProps, { logOut })(Confirmation);
