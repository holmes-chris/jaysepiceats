import React, { useState, useEffect } from 'react'
import {Stepper, Step, StepLabel, CircularProgress , Button, CssBaseline } from "@mui/material";

import { commerce } from "../../../lib/commerce";
import { Link, useNavigate } from "react-router-dom";
import "./checkout.css";
import ContactForm from "../ContactForm/ContactForm.js";
import PaymentForm from "../PaymentForm/PaymentForm.js"

//steps for the checkout process
const steps = ["Contact Info", "Payment Details"]



function Checkout({ cart, order, onCaptureCheckout, error }) {
const [activeStep, setActiveStep] = useState(0);
const [checkoutToken, setCheckoutToken] = useState(null);
const [contactData, setContactData] = useState({})
const navigate = useNavigate()

    //upon checkout, this function will generate a unique token with order details used throught the process
    useEffect(() => {
        async function generateToken() {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
                setCheckoutToken(token)
            } catch (error) {
                // navigate('/')
            }
        }
        generateToken()
    }, [cart]);

function nextStep() {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
}

function backStep() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
}


//this function is the "final next button" used to set the contact details and move to the next step.
function next(data) {
    setContactData(data)
    console.log(contactData)
    nextStep();
    
}


function Form() {
    if (activeStep === 0) {
        return (<ContactForm checkoutToken={checkoutToken} order={order} next={next}/>)
    } else 
        return (<PaymentForm order={order} contactData={contactData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>)
}


//this function renders after the checkout. Content is dependent upon success/failure
let Confirmation = () => order.customer ? (   
        <div className="confirmation-page-container" style={{maxWidth: "90%"}}>
            {error ? (
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h4 style={{margin: "30px auto 0 auto"}}>Error: {error}</h4>
                    <br />
                    <Button sx={{width: "170px", margin: "auto"}} component={Link} to="/" variant="contained">BACK TO HOME</Button>
                </div>
            ) : (
            <div style={{display: "flex", flexDirection: "column", height: "500px", marginTop: "20px"}} className="confirmation-page-content">
                <h3 style={{fontWeight: 400, width: "80%", margin: "90px auto 0 auto", alignItems: "center"}}>{`Thank you for your purchase, ${contactData.firstName} ${contactData.lastName}!`}</h3>
                <h4 style={{margin: "10px auto 0 auto", fontWeight: 300,}}>Order ref: {order.customer_reference}</h4>
                <Button sx={{margin: "70px auto 0 auto", width: "150px", padding: "10px", backgroundColor: "red"}} component={Link} to="/" variant="contained">BACK TO HOME</Button>
            </div>)}
        </div>
) : (
    //if the order.customer does not exist yet we are going to set the load screen
    <div style={{display: "flex"}}>
        <CircularProgress size={80} sx={{margin: "200px auto"}} />
    </div>
)

  return (
    <div className="checkout-container">
        <CssBaseline />
        <div className="checkout-content-container">
            <h1 className="checkout-title">Checkout</h1>
            <Stepper activeStep={activeStep} className="checkout-stepper">
                {steps.map((step) => (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {/* if the current step is the final step, and the next button is pressed, 
            the user will be taken to the confirmation page */}
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </div>
    </div>
  )
}

export default Checkout