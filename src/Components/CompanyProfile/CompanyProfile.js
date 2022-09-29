import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { CloseWidgetIcon } from '../../assets/icons';


const useStyles = makeStyles((theme) => ({
    companyContainer: {
        padding: theme.spacing(2),
    },
    companyLogo: {
        borderRadius: '100px',
        width: '68px',
        height: '68px',
        marginLeft: '15px'
    },
    companyName: {
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: 'white',
        fontSize: '24px',
        textTransform: 'none',
    }
}));

const CompanyProfile = ({ initializing, profile, handleCloseDialog, setExpanded, setActiveStep, logOut }) => {

    const classes = useStyles();

    return (
        <>
            <Grid container direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.companyContainer}>
                <Grid item>
                    <Avatar alt='companyLogo' className={classes.companyLogo} />
                </Grid>
                <Grid item xs={6} md={8}>
                    <Typography className={classes.companyName}>{profile.companyName}</Typography>
                </Grid>
                <Grid item>
                    <span style={{ cursor: 'pointer' }} onClick={() => { setExpanded(false); logOut() }}>
                        <CloseWidgetIcon />
                    </span>
                </Grid>
            </Grid>
            <Divider orientation='horizontal' variant='fullWidth' />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.companyProfile.profile,
    }
}

export default connect(mapStateToProps, {})(CompanyProfile)
