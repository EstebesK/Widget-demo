import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import { AddLocIcon, DeleteLocIcon, EndLocationIcon, StartLocationIcon } from '../../assets/icons';
import MapStyles from './mapStyles';



const useStyles = makeStyles((theme) => ({
    mapContainer: {
        width: '100%',
        height: '300px',
        position: 'relative'
    },
    destinationContainer: {
        padding: theme.spacing(1),
    },
    destinationText: {
        padding: theme.spacing(1),
    },
    dropDown: {
        position: 'absolute',
        zIndex: 1000,
        justifyContent: 'center'
    },
}));

const GoogleMap = React.memo(({ isRoutePossible, setDestinations, destinations, orderAddressDetails, ...props }) => {
    const classes = useStyles();

    const { register } = useForm();

    const [markers, setMarkers] = useState([])
    const [mapCenter, setMapCenter] = useState({ lat: 49.2827291, lng: -123.1207375 });

    const setUseHookState = (value, id) => {
        let newArr = [...destinations];
        newArr[id].rideCheckPoint = value;
        setDestinations(newArr)
    }

    const handleChange = (value, id) => {
        setUseHookState(value, id)
    }

    let selectedArray = null;

    const handleSelect = async (value, id) => {
        setUseHookState(value, id)
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        const placeId = results[0].place_id;
        let placeType = 0
        if (results[0].types.some((types) => types === 'airport')) {
            placeType = 2
        }
        selectedArray = [...destinations];
        selectedArray[id] = { ...selectedArray[id], latitude: latLng.lat, longitude: latLng.lng, placeId: placeId, placeType: placeType }
        setDestinations(selectedArray)
        setMapCenter({ lat: latLng.lat, lng: latLng.lng })
        setMarkers([...markers, { lat: latLng.lat, lng: latLng.lng }])
    }


    const addEndPoint = () => {
        let newArr = [...destinations, {
            rideCheckPoint: "",
            latitude: 0,
            longitude: 0,
            placeType: 0,
            placeId: ""
        }];
        setDestinations(newArr);
    }

    const removeEndPoint = (index) => {
        let newArr = [...destinations];
        newArr.splice(index, 1)
        setDestinations(newArr)
    }

    React.useEffect(() => {
        if (isRoutePossible)
            setDestinations(orderAddressDetails)
    }, [orderAddressDetails])

    return (
        <>
            <Grid container direction='column'>
                <Grid item className={classes.mapContainer}>
                    <Map
                        google={props.google}
                        disableDefaultUI={true}
                        center={{
                            lat: mapCenter.lat,
                            lng: mapCenter.lng
                        }}
                        styles={MapStyles}>
                        {markers.map((marker, id) => (
                            <Marker key={`${id}${marker.lat}`} lat={marker.lat} lng={marker.lng} />
                        ))}
                    </Map>
                </Grid>
                <Grid item className={classes.destinationContainer}>
                    <Grid container direction='column' >
                        {destinations.map((destination, id) => (
                            <PlacesAutocomplete
                                value={destinations[id].rideCheckPoint}
                                onChange={(value) => handleChange(value, id)}
                                onSelect={(value) => handleSelect(value, id)}
                                key={`${destination.id}${id}`}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <Grid item className={classes.destinationText}>
                                            <TextField
                                                variant="outlined"
                                                name='rideCheckPoint'
                                                defaultValue={destinations[id].rideCheckPoint}
                                                fullWidth
                                                required
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            {id === 0 &&
                                                                <StartLocationIcon />
                                                            }
                                                            {id === destinations.length - 1 &&
                                                                <EndLocationIcon />
                                                            }
                                                            {id > 0 && id < destinations.length - 1 &&
                                                                <span style={{
                                                                    borderRadius: '50%', width: '25px', height: '25px',
                                                                    backgroundColor: 'transparent',
                                                                    border: '2px solid #FFFFFF',
                                                                    textAlign: 'center', fontFamily: 'Roboto', fontWeight: '700', fontSize: '0.9rem',
                                                                }}>{id}</span>
                                                            }
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment style={{ cursor: 'pointer', }} position="end">
                                                            {id === destinations.length - 1 &&
                                                                <span onClick={addEndPoint}>
                                                                    <AddLocIcon />
                                                                </span>
                                                            }
                                                            {id > 0 && id < destinations.length - 1 &&
                                                                <span onClick={() => removeEndPoint(id)}>
                                                                    <DeleteLocIcon />
                                                                </span>
                                                            }
                                                        </InputAdornment>
                                                    )
                                                }}
                                                {...getInputProps({
                                                    placeholder: id === 0 ? 'From' : 'To',
                                                    className: 'location-search-input',
                                                })}
                                            />
                                        </Grid>
                                        <div className={classes.dropDown}>
                                            {loading && <div style={{ alignItems: 'center' }}>Loading...</div>}
                                            {suggestions.map((suggestion, id) => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#101020', cursor: 'pointer', textTransform: 'none', justifyContent: 'center' }
                                                    : {
                                                        backgroundColor: '#160E31', cursor: 'pointer',
                                                        textTransform: 'none', width: '490px', justifyContent: 'center'
                                                    };
                                                return (
                                                    <div key={`${id}${suggestion.description}`}
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <MenuItem>{suggestion.description}</MenuItem>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
)


export default GoogleApiWrapper({
    apiKey: ('AIzaSyCmKhi_5V_pulQtm6DFJ8teDZpR9I5hJoM'),
    libraries: ["places", "drawing", "geometry"]
})(GoogleMap)