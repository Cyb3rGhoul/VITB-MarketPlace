import React, { useState } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField';
import { Link } from 'react-router-dom';

const AddressFrom = ({ checkoutToken, next }) => {
  const methods = useForm();

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next(data))}>
        <Grid container spacing={3}>
          <FormInput required name='firstName' label='First Name' />
          <FormInput required name="lastName" label="Last name" />
          <FormInput required name="number" label="Phone number" />
          <FormInput required name="email" label="Your College Email" />
          <FormInput required name="block" label="Block" />
          <FormInput required name="room" label="Room Number" />
        </Grid>
        <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default AddressFrom