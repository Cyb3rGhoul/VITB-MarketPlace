import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe('pk_live_51NM4u8SCb5wtJaD4nF0VKnyhQtDnYzoDwF4stID6mXKomSjo7dvP6mDzbk94YgwwLgJyIvIKBoNQveictW0DOdXp00OZatoPZo');

const PaymentFrom = ({ checkoutToken, backStep, shippingData, onCaptureCheckout, nextStep }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || elements) return;

    const cardElement = elements.getElement(CardElement);

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

  //   if (error) {
  //     console.log(error);
  //   } else {
  //     const orderData = {
  //       line_items: checkoutToken.line_items,
  //       customer: {
  //         firstname: shippingData.firstname,
  //         lastname: shippingData.lastname,
  //         email: shippingData.email,
  //         phonenumber: shippingData.number
  //       },
  //       shipping: {
  //         name: 'Primary',
  //         block: shippingData.block,
  //         room: shippingData.room
  //       }
  //     };

  //     const payment = {
  //       gateway: 'stripe',
  //       stripe: {
  //         payment_method_id: paymentMethod.id
  //       }
  //     };
  //     onCaptureCheckout(checkoutToken.id, orderData);

  //     nextStep();
  //   }
  // }
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>Back
                </Button>
                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
}
}
export default PaymentFrom