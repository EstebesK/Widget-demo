import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { connect } from 'react-redux';
import { BackArrowIcon, ForwardArrowIcon } from '../../../assets/icons';
import { setNoteRedux, setOrderSum } from '../../../Redux/form-reducer';
import Directions from '../../GoogleMap/Directions';
import CityReservationFailed from '../CityReservationFailed';
import { cars } from './../../Helpers/Fleet';
import Preloader from './../../Helpers/Preloader';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#191929',
        borderRadius: '8px'
    },
    contentContainer: {
        padding: theme.spacing(2),
        overflow: 'visible'
    },
    carInfoCont: {
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
            padding: theme.spacing(3)
        },
    },
    priceBox: {
        backgroundColor: '#851EDF',
        padding: theme.spacing(1)
    },
}));

const Preview = ({ isRoutePossible, setIsRoutePossible, carId, formData, next, back, setActiveStep, setNoteRedux, setOrderSum, selectedCarId }) => {

    const classes = useStyles();
    const selectedCar = cars[selectedCarId - 1].find(car => car.id === carId)

    const [note, setNote] = React.useState('');
    const [distance, setDistance] = React.useState(0)
    const [routeIsFetching, setRouteIsFetching] = React.useState(true)

    const sendNote = (note) => {
        setNoteRedux(note)
    }

    const handleChange = (event) => {
        setNote(event.target.value);
    };

    React.useEffect(() => {
        setNote(formData.orderNotes)
    }, [formData.orderNotes])

    console.log(isRoutePossible)

    return (
        <>
            <>
                <Grid container spacing={1} className={classes.contentContainer}>
                    <Grid item>
                        <Typography variant='body2'>Preview</Typography>
                    </Grid>
                </Grid>
                <Directions routeIsFetching={routeIsFetching} setIsRoutePossible={setIsRoutePossible} setRouteIsFetching={setRouteIsFetching} destinations={formData.orderAddressDetails} setActiveStep={setActiveStep} setDistance={setDistance} />
                {routeIsFetching ? <Preloader /> : isRoutePossible ?
                    <Grid container justify='center'>
                        <Grid container direction='column' spacing={2} className={classes.contentContainer}>
                            <Grid item>
                                <Typography variant='body1'>Preview</Typography>
                            </Grid>
                            <Grid item>
                                <ListItem className={classes.root}>
                                    <Grid container direction='row' justify="space-around"
                                        alignItems="center">
                                        <Grid item>
                                            <Grid container direction='column' spacing={2} className={classes.carInfoCont}>
                                                <Grid item>
                                                    <Typography>{selectedCar.type} <span style={{
                                                        height: '5px', width: '5px',
                                                        backgroundColor: '#C4C4C4', borderRadius: '50%', display: 'inline-block',
                                                        marginBottom: '2.5px'
                                                    }}></span> Capacity 1-{selectedCar.capacity}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='body2'>{selectedCar.make} </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='body2'>{selectedCar.model} </Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Paper className={classes.priceBox}>
                                                        <Grid container justify='center'>
                                                            <Typography variant='body2'>${selectedCar.price}</Typography>
                                                        </Grid>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Carousel autoPlay={false} animation='slide'
                                                navButtonsProps={{
                                                    style: {
                                                        width: '1em',
                                                        height: '1em'
                                                    }
                                                }}
                                                indicatorIconButtonProps={{
                                                    style: {
                                                        '&:hover': {
                                                            '& $button': {
                                                                backgroundColor: "#10B7EC",
                                                                filter: "brightness(120%)",
                                                                opacity: "0.4"
                                                            }
                                                        }
                                                    }
                                                }}
                                                activeIndicatorIconButtonProps={{
                                                    style: {
                                                        color: '#10B7EC',
                                                    }
                                                }}
                                                indicatorContainerProps={{
                                                    style: {

                                                    }
                                                }}>
                                                {
                                                    selectedCar.imageUrls.map((url) =>
                                                        <img src={url.path} style={{ width: '200px', height: '136px', borderRadius: '8px' }} alt='car' key={url.id} />
                                                    )
                                                }
                                            </Carousel>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </Grid>
                            <Grid item>
                                <Grid container direction='row' justify="space-between"
                                    alignItems="center">
                                    <Grid item>
                                        <Typography>Date</Typography>
                                    </Grid>
                                    <Grid item style={{ flexGrow: 1 }}>
                                        <Box style={{ marginTop: '13px', backgroundColor: 'transparent', borderColor: '#292742', borderStyle: 'dashed', borderWidth: '1px' }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>{new Date(formData.orderStartDateTime).toLocaleDateString('en-GB')}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction='row' justify="space-between"
                                    alignItems="center">
                                    <Grid item>
                                        <Typography>Time</Typography>
                                    </Grid>
                                    <Grid item style={{ flexGrow: 1 }}>
                                        <Box style={{ marginTop: '13px', backgroundColor: 'transparent', borderColor: '#292742', borderStyle: 'dashed', borderWidth: '1px' }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {new Date(formData.orderStartDateTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric' })}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Grid container direction='row' justify="space-between"
                                    alignItems="center">
                                    <Grid item>
                                        <Typography>From</Typography>
                                    </Grid>
                                    <Grid item style={{ flexGrow: 1 }}>
                                        <Box style={{ marginTop: '13px', backgroundColor: 'transparent', borderColor: '#292742', borderStyle: 'dashed', borderWidth: '1px' }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{ wordWrap: "break-word" }}>
                                            {formData.orderAddressDetails[0].rideCheckPoint}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction='row' justify="space-between"
                                    alignItems="center">
                                    <Grid item>
                                        <Typography>To</Typography>
                                    </Grid>
                                    <Grid item style={{ flexGrow: 1 }}>
                                        <Box style={{ marginTop: '13px', backgroundColor: 'transparent', borderColor: '#292742', borderStyle: 'dashed', borderWidth: '1px' }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{ wordWrap: "break-word" }}>
                                            {formData.orderAddressDetails[formData.orderAddressDetails.length - 1].rideCheckPoint}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Grid container direction='row' justify="space-between"
                                    alignItems="center">
                                    <Grid item>
                                        <Typography>Vehicle</Typography>
                                    </Grid>
                                    <Grid item style={{ flexGrow: 1 }}>
                                        <Box style={{ marginTop: '13px', backgroundColor: 'transparent', borderColor: '#292742', borderStyle: 'dashed', borderWidth: '1px' }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {selectedCar.type}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction='row' justify="space-between"
                                    alignItems="center">
                                    <Grid item>
                                        <Typography>Total distance</Typography>
                                    </Grid>
                                    <Grid item style={{ flexGrow: 1 }}>
                                        <Box style={{ marginTop: '13px', backgroundColor: 'transparent', borderColor: '#292742', borderStyle: 'dashed', borderWidth: '1px' }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {distance} miles
                                </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction='row' justify="space-between"
                                    alignItems="center">
                                    <Grid item>
                                        <Typography>Total</Typography>
                                    </Grid>
                                    <Grid item style={{ flexGrow: 1 }}>
                                        <Box style={{
                                            marginTop: '13px', backgroundColor: 'transparent',
                                            borderColor: '#292742', borderStyle: 'dashed', borderWidth: '1px'
                                        }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {`$${selectedCar.price}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <TextField id="outlined-multiline-static"
                                    style={{ backgroundColor: '#3F3D4A', borderRadius: '8px' }}
                                    label="Notes"
                                    multiline
                                    fullWidth
                                    rows={2}
                                    variant="outlined"
                                    value={note}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item>
                                <Grid container direction='row' alignItems="center" justify='center' spacing={1} className={classes.buttonGroup}>
                                    <Grid item xs={6}>
                                        <Button variant='contained' color='primary' fullWidth onClick={back}
                                            startIcon={<BackArrowIcon />}
                                            style={{ height: '50px', borderRadius: '8px', backgroundColor: '#1B1837', textTransform: 'none' }}>Back</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant='contained' fullWidth onClick={() => { next(); sendNote(note); setOrderSum(selectedCar.price) }}
                                            color='primary'
                                            endIcon={<ForwardArrowIcon />}
                                            style={{ height: '50px', borderRadius: '8px', textTransform: 'none' }}>Next</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    :
                    <CityReservationFailed setActiveStep={setActiveStep} />
                }
            </>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        formData: state.formData,
        carId: state.formData.carInfo.id,
        selectedCarId: state.cars.carId,
    }
}

export default connect(mapStateToProps, { setNoteRedux, setOrderSum })(Preview)
