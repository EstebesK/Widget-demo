import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MinusIcon, PlusIcon } from '../../../assets/icons';

const Hours = ({ hoursState, setHourly, hourly }) => {

    const { register, formState: { errors } } = useFormContext();

    const [value, setValue] = useState(0)

    const onDecrease = () => {
        if (value === 0) {
            return;
        }
        setValue(value => value - 1)
    }
    const onIncrease = () => {
        setValue(value => value + 1)
    }

    React.useEffect(() => {
        if (hoursState !== 0 && hoursState !== undefined) {
            setHourly(true)
            setValue(parseInt(hoursState))
        } else if (hoursState === undefined) {
            setValue(0)
        } else if (!hourly) {
            setValue(0)
        }
    }, [hoursState, hourly])

    return (
        <Grid container direction="row"
            justify="space-between"
            alignItems="center">
            <Grid item>
                <Typography>Hours</Typography>
            </Grid>
            <Grid item>
                <Grid container direction="row"
                    justify="space-around"
                    alignItems="center">
                    <Grid item>
                        <span onClick={onDecrease} >
                            <MinusIcon />
                        </span>
                    </Grid>
                    <Grid item style={{ textAlign: 'center' }}>
                        <input ref={register({ required: true, min: 1 })} name="hours" value={value} readOnly size='1' style={{
                            pointerEvents: 'none', backgroundColor: 'transparent',
                            border: 'none', color: '#FFFFFF', textAlign: 'center',
                            fontFamily: 'Roboto', textTransform: 'none',
                            fontWeight: '400',
                            fontSize: '1.2rem',
                        }} />
                    </Grid>
                    <Grid item>
                        <span onClick={onIncrease}>
                            <PlusIcon />
                        </span>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify='flex-end'>
                <Grid item>
                    {errors.hours && <div style={{ color: 'red', margin: '0px', padding: '0px', }}>{'Must be at least 1 hour'}</div>}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Hours


