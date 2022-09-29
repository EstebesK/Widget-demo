import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { isMobile } from "react-device-detect";
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import { BookinglaneIcon } from './assets/icons';
import CheckOut from './Components/CheckoutForm/CheckOut/CheckOut';
import CompanyProfile from './Components/CompanyProfile/CompanyProfile';
import theme from './Theme';
import { logOut } from './Redux/form-reducer';

export const userScreenHeight = window.innerHeight;
export const userScreenWidth = window.innerWidth;

let xOrdinate = 0;
let yOrdinate = 0;

const useStyles = makeStyles((theme) => ({
  '@keyframes pulse': {
    '0%': {
      '-moz-box-shadow': '0 0 0 0 rgba(87, 127, 252, 1)',
      'box-shadow': '0 0 0 0 rgba(87, 127, 252, 1)'
    },
    '70%': {
      '-moz-box-shadow': '0 0 0 10px rgba(87,127,252, 0)',
      'box-shadow': '0 0 0 10px rgba(87,127,252, 0)'
    },
    '100%': {
      '-moz-box-shadow': '0 0 0 0 rgba(87,127,252, 0)',
      'box-shadow': '0 0 0 0 rgba(87,127,252, 0)'
    }
  },
  MuiAccordionroot: {
    "&.MuiAccordion-root:before": {
      backgroundColor: "white",
    },
    '& .MuiAccordionSummary-root.Mui-disabled': {
      opacity: 1
    },
    '& .MuiAccordionDetails-root': {
      padding: '0px'
    },
    '& .MuiAccordionSummary-expandIcon': {
      transition: '0ms',
      animationName: '$pulse',
      animationIterationCount: 'infinite',
      animationDuration: '2s',
    },
  },

  main: {
    position: 'fixed',
    bottom: '1px'
  },
  accordion: {
    width: '150px',
    height: '150px',
    bottom: '50px',
    left: '90px',
    background: 'none',
    padding: theme.spacing(1),
    position: 'fixed',
    [theme.breakpoints.down('xs')]: {
      left: '10px'
    },
  },
  content: {
    position: 'absolute',
    cursor: 'default',
    height: '100vh',
    width: '500px',
    borderRadius: '0',
    bottom: '-1px',
    // left: '-20px',
    '&::-webkit-scrollbar': {
      width: '0.8em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#3F3D4A',
      borderRadius: '20px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    },
    [theme.breakpoints.down('xs')]: {
      width: userScreenWidth,
      height: userScreenHeight + 1,
    },
  }
}));

const App = (props) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  let position = React.useRef({ x: 0, y: 0 });
  const [expanded, setExpanded] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [disableDragging, setDisableDragging] = React.useState(false)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setExpanded(false)
  }

  const handleChange = (panel) => (event, isExpanded) => {
    yOrdinate = position.current.y;
    xOrdinate = position.current.x;
    position.current.y = 0
    if (userScreenWidth - xOrdinate < 500) {
      position.current.x = userScreenWidth - 500;
    }
    if (xOrdinate < -20) {
      position.current.x = 0;
    }
    setExpanded(isExpanded ? panel : false);
  };

  const enableAccordionButton = (e) => {
    setTimeout(() => { setDisabled(false) }, 200);
    if (expanded) {
      yOrdinate = position.current.y;
      xOrdinate = position.current.x;
      if (xOrdinate + 500 > userScreenWidth) {
        position.current.x = userScreenWidth - 500;
      }
      if (xOrdinate < -20) {
        position.current.x = 0;
      }
      if (yOrdinate < 0) {
        position.current.y = 0;
      }
      if (yOrdinate > 0) {
        position.current.y = 0
      }
    }
  };

  const handleDrag = (e, ui) => {
    position.current.x = ui.x;
    position.current.y = ui.y;
    if (!expanded) setTimeout(() => { setDisabled(true) }, 200);
  };

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  return (
    <>
      {isMobile ?
        <>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <div className={classes.main}>
              <Accordion
                elevation={0}
                disabled={disabled}
                classes={{
                  root: classes.MuiAccordionroot,
                  disabled: classes.disabledButton
                }}
                TransitionProps={{
                  timeout: 0
                }}
                expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                  className={classes.accordion}
                  expandIcon={<BookinglaneIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  IconButtonProps={{
                    disableRipple: true
                  }}
                />
                <AccordionDetails>
                  <Card className={classes.content} style={{ bottom: userScreenHeight - yOrdinate }} style={activeStep === 1 ? { overflowY: 'hidden' } : { overflowY: 'auto' }} >
                    <CompanyProfile setExpanded={handleClose} initializing={props.initializing} expanded={expanded} setActiveStep={setActiveStep} />
                    <CheckOut isFetching={props.isFetching} setExpanded={handleClose} activeStep={activeStep} setActiveStep={setActiveStep} nextStep={nextStep} backStep={backStep} />
                  </Card>
                </AccordionDetails>
              </Accordion>
            </div>
            {/* <div className={classes.main}>

              <Button className={classes.mobileButton} variant="outlined" color="primary" onClick={handleClickOpen}>
                <BookinglaneIcon />
              </Button>

            </div>
            <Dialog fullScreen open={open} onClose={handleCloseDialog} scroll='body' TransitionComponent={Transition}>
              <div className={classes.mobileMain}>
                {jwtToken &&
                  <Card className={classes.mobileContent} style={activeStep === 1 ? { overflowY: 'hidden' } : { overflowY: 'auto' }} >
                    <CompanyProfile handleCloseDialog={handleCloseDialog} expanded={expanded} setActiveStep={setActiveStep} />
                    <CheckOut isFetching={props.isFetching} handleCloseDialog={handleCloseDialog} activeStep={activeStep} setActiveStep={setActiveStep} nextStep={nextStep} backStep={backStep} />
                  </Card>
                }
                {!jwtToken && null}
              </div>
            </Dialog> */}
          </ThemeProvider >
        </>
        :
        <>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <div className={classes.main}>
              <Draggable
                onDrag={handleDrag}
                onStop={enableAccordionButton}
                position={position.current}
                disabled={disableDragging}>
                <Accordion
                  elevation={0}
                  disabled={disabled}
                  classes={{
                    root: classes.MuiAccordionroot,
                    disabled: classes.disabledButton
                  }}
                  TransitionProps={{
                    timeout: 0
                  }}
                  expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary
                    className={classes.accordion}
                    expandIcon={<BookinglaneIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    IconButtonProps={{
                      disableRipple: true
                    }}
                  />
                  <AccordionDetails>
                    <Card className={classes.content} style={{ bottom: userScreenHeight - yOrdinate }} style={activeStep === 1 ? { overflowY: 'hidden' } : { overflowY: 'auto' }} >
                      <CompanyProfile setExpanded={handleClose} initializing={props.initializing} expanded={expanded} setActiveStep={setActiveStep} logOut={logOut} />
                      <CheckOut isFetching={props.isFetching} setDisableDragging={setDisableDragging} setExpanded={handleClose} activeStep={activeStep} setActiveStep={setActiveStep} nextStep={nextStep} backStep={backStep} />
                    </Card>
                  </AccordionDetails>
                </Accordion>
              </Draggable>
            </div>
          </ThemeProvider >
        </>
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    companyName: state.companyProfile.profile.companyName,
  }
}

export default connect(mapStateToProps, {})(App)
