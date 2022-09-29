import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { connect } from 'react-redux';
import { BackArrowIcon, ForwardArrowIcon } from '../../../assets/icons';
import { setCarId } from '../../../Redux/form-reducer';
import { cars } from './../../Helpers/Fleet';
import { userScreenHeight, userScreenWidth } from '../../../App';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#191929',
        borderRadius: '8px',
        padding: theme.spacing(2),
    },
    contentContainer: {
        padding: theme.spacing(2),
    },
    carContainer: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        height: '500px',
        '&::-webkit-scrollbar': {
            width: '0.7em',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#3F3D4A',
            borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#555'
        },
    },
    priceBox: {
        backgroundColor: '#851EDF',
        padding: theme.spacing(1),
    },
    buttonGroup: {
        bottom: 0,
        position: 'absolute',
        padding: '0 22px 15px 0',
        backgroundColor: theme.palette.background.paper
    },
    carInfoCont: {
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
            padding: theme.spacing(3)
        },
    },
    carModalImage: {
        width: '600px',
        height: '400px',
        borderRadius: '8px',
        [theme.breakpoints.down('xs')]: {
            width: userScreenWidth - 20,
            height: userScreenHeight / 3,
            borderRadius: '8px',
        },
    }
}));



const FleetForm = ({ isFetching, back, next, setCarId, selectedCarId }) => {

    const classes = useStyles();
    const [carCard, setCarCard] = React.useState(0);
    const [carModal, setCarModal] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id) => {
        setCarModal(id)
        setOpen(true);
    };

    const handleClose = () => {
        setCarModal(null)
        setOpen(false);
    };

    const handleClick = (id) => {
        setCarCard(id)
    }

    let result = null;
    if (carModal) {
        result = cars[selectedCarId - 1].find((cars) => carModal === cars.id)
    }

    React.useEffect(() => {
        setCarCard(carCard)
    }, [carCard])

    return (
        <>
            <Grid container justify='center' >
                <Grid container direction='column' spacing={1} className={classes.contentContainer}>
                    <Grid item>
                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 700, color: '#FFFFFF', fontSize: '24px', lineHeight: '36px' }}>Select vehicle</Typography>
                    </Grid>
                    <Grid item className={classes.carContainer}>
                        <Grid container direction='column' spacing={2} >
                            {cars[selectedCarId - 1].map((car, index) => (
                                <Grid item key={`${car.id}${car.name}`}>
                                    <ListItem className={classes.root}
                                        onClick={() => handleClick(car.id)}
                                        selected={car.id === carCard}
                                        classes={{ selected: classes.active }}>
                                        <Grid container direction='row' justify="space-around"
                                            alignItems="center">
                                            <Grid item>
                                                <Grid container direction='column'
                                                    spacing={2} className={classes.carInfoCont}>
                                                    <Grid item>
                                                        <Typography>{car.type} <span style={{
                                                            height: '5px', width: '5px',
                                                            backgroundColor: '#C4C4C4', borderRadius: '50%', display: 'inline-block',
                                                            marginBottom: '2.5px'
                                                        }}></span> Capacity 1-{car.capacity}</Typography>
                                                    </Grid>
                                                    <Grid item >
                                                        <Typography variant='body2' >{car.make}</Typography>
                                                    </Grid>
                                                    <Grid item >
                                                        <Typography variant='body2' >{car.model}</Typography>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Paper className={classes.priceBox}>
                                                            <Grid container justify='center'>
                                                                <Typography variant='body2'>${car.price}</Typography>
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
                                                    {car.imageUrls.length !== 0 ?
                                                        car.imageUrls.map((url) => (
                                                            <span key={url.id} variant="outlined" color="primary" onClick={() => handleClickOpen(car.id)}>
                                                                <img src={url.path} style={{ width: '200px', height: '136px', borderRadius: '8px', cursor: 'zoom-in' }} alt='car' />
                                                            </span>
                                                        )
                                                        )
                                                        :
                                                        <img src={'https://fl-1.cdn.flockler.com/embed/not-found.png'} style={{ width: '200px', height: '136px', borderRadius: '8px' }} alt='car' />
                                                    }
                                                </Carousel>
                                                {carModal &&
                                                    <Dialog
                                                        onClick={() => handleClickOpen(car.id)}
                                                        open={open}
                                                        onClose={handleClose}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <DialogActions>
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
                                                                {carModal && result.imageUrls.map((url) => (<img src={url.path} className={classes.carModalImage} alt='car' key={`${url.id}${url.path}`} />))}
                                                            </Carousel>
                                                        </DialogActions>
                                                    </Dialog>
                                                }
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid container direction='row' alignItems="center" justify='center' spacing={1} className={classes.buttonGroup}>
                        <Grid item xs={6}>
                            <Button variant='contained' color='primary' fullWidth onClick={back}
                                startIcon={<BackArrowIcon />}
                                style={{ height: '50px', borderRadius: '8px', backgroundColor: '#1B1837', textTransform: 'none' }}>Back</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant='contained' fullWidth onClick={() => { next(); setCarId(carCard) }}
                                color='primary'
                                endIcon={<ForwardArrowIcon />}
                                disabled={carCard ? false : true}
                                style={{ height: '50px', borderRadius: '8px', textTransform: 'none' }}>Next</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedCarId: state.cars.carId,
        isFetching: state.cars.isFetching
    }
}

export default connect(mapStateToProps, { setCarId })(FleetForm)
