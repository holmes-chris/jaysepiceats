import React, { useEffect } from 'react';
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { Button } from "@mui/material"
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review.js";
import "./paymentForm.css"

//loading stipe js
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

function PaymentForm({checkoutToken, backStep, onCaptureCheckout, nextStep, contactData }) {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log(`ERROR ${error}`)
    } else {
      //creating and setting the order data object to contact details
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: { 
          firstname: contactData.firstName,
          lastname: contactData.lastName,
          phone: contactData.phoneNumber,
          meta: [{
            carMake: contactData.carMake,
          }, {
            carColor: contactData.carColor
          }],
          email: contactData.email
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      }
      //final capture of the order
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  }


  return (
    <div>
      <Review checkoutToken={checkoutToken} />
      <h3 style={{fontWeight: 400, paddingLeft: "10px"}}> Payment Method</h3>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement className="card-element" />
              <br /> <br />
              <div style={{display: "flex"}}>
                <Button className="back-to-contact-form-bttn" onClick={backStep}>BACK</Button>
                <Button className="stripe-pay-bttn" type="submit" disabled={!stripe}>
                  PAY { checkoutToken.subtotal.formatted_with_symbol }
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  )
}

export default PaymentForm