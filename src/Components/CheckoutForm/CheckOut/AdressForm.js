import DateFnsUtils from '@date-io/date-fns';
import { ListItem, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";
import { ClockIcon, ForwardArrowIcon, PlaneIcon, Ticket } from '../../../assets/icons';
import GoogleMap from '../../GoogleMap/GoogleMap';
import { setFormData, setCarId } from './../../../Redux/form-reducer';
import { setCarCategoryId } from './../../../Redux/car-reducer';
import { CustomFormInput, DataInputControl } from './CustomFormInput';
import Hours from './Hours';
import PassengerQuantity from './PassengerQuantity';
import { airlinesData } from './../../Helpers/Airlines';

const useStyles = makeStyles((theme) => ({
    contentContainer: {
        padding: theme.spacing(2),
    },
    carItem: {
        backgroundColor: theme.palette.carContainer.color,
        borderRadius: '10px',
        marginTop: theme.spacing(1),
        padding: 0
    },
    carFont: {
        textTransform: 'uppercase',
        fontSize: '1.2em'
    },
    carImageContainer: {
        width: '100px',
    },
    carImage: {
        width: '100%',
        height: '55px',
        objectFit: 'cover',
        padding: '5px'
    },
    carItemContainer: {
        paddingTop: theme.spacing(2),
    },
    preferences: {
        left: 0
    },
    submitButton: {
        paddingTop: '40px'
    }
}));

const AdressForm = ({ isRoutePossible, setCarCategoryId, next, carTypes, setFormData, formData }) => {

    const classes = useStyles();

    const [carSelectionID, setCarSelectionID] = useState(0)
    const [bookingType, setBookingType] = useState(1)
    const [disableHourly, setDisableHourly] = useState(false)
    const [hourly, setHourly] = useState(false)
    const [isGateMeeting, setIsGateMeeting] = useState(false);
    const [isAirline, setIsAirline] = useState(false)
    const [airlineId, setAirlineId] = useState(0)
    const [airlines, setAirlines] = useState([...airlinesData])

    const [destinations, setDestinations] = useState([{
        rideCheckPoint: "",
        latitude: 0,
        longitude: 0,
        placeType: 0,
        placeId: ""
    },
    {
        rideCheckPoint: "",
        latitude: 0,
        longitude: 0,
        placeType: 0,
        placeId: ""
    }]);

    React.useEffect(() => {
        if (!isRoutePossible) {
            let startingDest = [{
                rideCheckPoint: "",
                latitude: 0,
                longitude: 0,
                placeType: 0,
                placeId: ""
            },
            {
                rideCheckPoint: "",
                latitude: 0,
                longitude: 0,
                placeType: 0,
                placeId: ""
            }]
            setDestinations([...startingDest])
        }
    }, [isRoutePossible])


    const handleClick = (id) => {
        setCarSelectionID(id)
    }

    const { handleSubmit, ...methods } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        setCarCategoryId(carSelectionID)
        setFormData({
            ...data, hours: data.hours, isAirportPickupIncluded: isGateMeeting, airlines: { id: airlineId },
            orderAddressDetails: [...destinations], bookingType: bookingType
        })
        next()
    }

    let firstAirline = destinations[0].placeType

    React.useEffect(() => {
        if (formData.hours !== 0) {
            setHourly(true)
        }
    }, [formData.hours])

    React.useEffect(() => {
        if (firstAirline === 2) {
            setIsAirline(true)
            setBookingType(3)
            setDisableHourly(true)
        } else {
            setIsAirline(false)
            setDisableHourly(false)
        }
    }, [firstAirline])

    return (
        <Grid item>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item>
                        <GoogleMap isRoutePossible={isRoutePossible} setDestinations={setDestinations} destinations={destinations} orderAddressDetails={formData.orderAddressDetails} />
                    </Grid>
                    <Grid container justify='center'>
                        <Grid container direction='column' spacing={2} className={classes.contentContainer}>
                            {isAirline && bookingType === 3 &&
                                <>
                                    <Grid item>
                                        <Autocomplete
                                            id="combo-box-demo"
                                            options={airlines}
                                            defaultValue={null}
                                            autoHighlight
                                            getOptionLabel={(option) => option.name}
                                            renderOption={(option) => (
                                                <>
                                                    <span>{option.code}</span>
                                                    {option.name} ({option.code})
                                                </>
                                            )}
                                            renderInput={params => {
                                                params.InputProps.startAdornment = (
                                                    <InputAdornment position="start">
                                                        <PlaneIcon />
                                                    </InputAdornment>
                                                );
                                                return (
                                                    <TextField
                                                        {...params}
                                                        fullWidth placeholder="Airlines" variant="outlined"
                                                    />
                                                );
                                            }}
                                            onChange={(event, newValue) => {
                                                newValue ? setAirlineId(newValue.id) : setAirlineId(null)
                                            }}
                                            name='airlines'
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction='row' justify='space-between' alignItems='center'>
                                            <Grid item xs={6}>
                                                <CustomFormInput name='flightNumber' variant="outlined"
                                                    placeholder='Flight number'
                                                    defaultValue={null}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Ticket />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item >
                                                <Grid container direction='row' alignItems='center' justify='space-evenly'>
                                                    <Grid item>
                                                        <Typography>Gate meeting</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Switch onClick={() => setIsGateMeeting(!isGateMeeting)} color='primary' />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            }
                            <Grid item style={{ paddingTop: '20px' }}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DataInputControl
                                        name='orderStartDateTime'
                                        inputVariant="outlined"
                                        label='Pick up Date/Time'
                                        defaultValue={new Date()}
                                        disablePast
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <ClockIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item>
                                <PassengerQuantity passengersqState={formData.passengersQuantity} />
                            </Grid>
                            <Grid item>
                                <Grid container direction='row'
                                    justify="space-between"
                                    alignItems="center">
                                    <Grid item>
                                        <Typography>Hourly</Typography>
                                    </Grid>
                                    <Switch color='primary' disabled={disableHourly} checked={hourly} onClick={() => { setHourly(!hourly); hourly ? setBookingType(2) : setBookingType(1) }} />
                                </Grid>
                            </Grid>
                            <Grid item>
                                {hourly === true &&
                                    <Grid item>
                                        <Hours hoursState={formData.hours} setHourly={setHourly} hourly={hourly} />
                                    </Grid>}
                            </Grid>
                            <Grid item>
                                <Grid item>
                                    <Typography className={classes.preferences}>Preferences</Typography>
                                </Grid>
                                <Grid item className={classes.carContainer}>
                                    <Grid container direction='row' justify="space-between"
                                        alignItems="center">
                                        {carTypes.map((car) => (
                                            <Grid item key={`${car.id}${car.name}`}>
                                                <ListItem className={classes.carItem} onClick={() => handleClick(car.id)}
                                                    selected={car.id === carSelectionID}
                                                    classes={{ selected: classes.active }}>
                                                    <Grid container direction='column' justify="space-between"
                                                        alignItems="center" className={classes.carItemContainer}>
                                                        <Grid item>
                                                            <Typography className={classes.carFont} noWrap variant='body2'>{car.name}</Typography>
                                                        </Grid>
                                                        <Grid item className={classes.carImageContainer}>
                                                            <img alt='carImage' src={car.imageUrl} className={classes.carImage} />
                                                        </Grid>
                                                    </Grid>
                                                </ListItem>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.submitButton}>
                                    <Grid container justify='center'>
                                        <Button type="submit" disabled={carSelectionID ? false : true} color='primary' variant='contained' fullWidth style={{ height: '50px', borderRadius: '8px' }}
                                            endIcon={<ForwardArrowIcon />}><Typography variant='body2'>Next step</Typography></Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider >
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        carTypes: state.companyProfile.profile.carTypes,
        formData: state.formData
    }
}

export default connect(mapStateToProps, { setCarCategoryId, setCarId, setFormData })(AdressForm)
