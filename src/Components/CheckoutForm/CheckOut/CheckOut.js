import React from 'react';
import AdressForm from './AdressForm';
import Payment from './Payment';
import FleetForm from './FleetForm';
import Preview from './Preview';
import Confirmation from '../Confirmation';


const CheckOut = ({ setActiveStep, setExpanded, activeStep, nextStep, backStep, setDisableDragging }) => {

    const [isRoutePossible, setIsRoutePossible] = React.useState(false)

    const Form = () => {
        switch (activeStep) {
            case 0:
                return <AdressForm isRoutePossible={isRoutePossible} setDisableDragging={setDisableDragging} next={nextStep} />;
            case 1:
                return <FleetForm next={nextStep} back={backStep} />;
            case 2:
                return <Preview setIsRoutePossible={setIsRoutePossible} isRoutePossible={isRoutePossible} next={nextStep} back={backStep} setActiveStep={setActiveStep} />;
            case 3:
                return <Payment back={backStep} next={nextStep} />;
            default:
                break;
        }
    }

    return (
        <>
            {activeStep === 4 ? <Confirmation back={backStep} setExpanded={setExpanded} setActiveStep={setActiveStep} /> : <Form />}
        </>
    )
}

export default CheckOut
