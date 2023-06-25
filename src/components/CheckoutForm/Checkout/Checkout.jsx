import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';

import useStyles from './styles'

import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressFrom';
import PaymentForm from '../PaymentFrom';
import Confirmation from '../Confirmation';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          setCheckoutToken(await commerce.checkout.generateToken(cart.id, { type: 'cart' }));
        } catch {
          
        }
      };

      generateToken();
    }
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1) ;
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1) ;

  const next = (data) => {
    setShippingData(data);

    nextStep();
  }


  const Form = () => (activeStep === 0
    ? <AddressForm next={next} checkoutToken={checkoutToken} setShippingData={setShippingData}/>
    : <PaymentForm checkoutToken={checkoutToken} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} />);


  return(
  <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation nextStep={nextStep}/> : <Form />}
        </Paper>
      </main>
    </>
)
};

export default Checkout;