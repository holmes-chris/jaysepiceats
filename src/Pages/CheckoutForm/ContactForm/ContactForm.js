import React, { useEffect } from 'react';
import { Button, Grid } from "@mui/material"
import { useForm, FormProvider } from "react-hook-form";
import { Link, Outlet } from "react-router-dom"
import "./ContactForm.css";

import FormInput from "../Checkout/FormInput.js"

function ContactForm({ checkoutToken, next}) {

  const methods = useForm();
  

  return (
    <div className="contact-form-container">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) =>  next({...data}))} className="contact-form" style={{display: "flex", flexDirection: "column"}}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First Name" />
            <FormInput required name="lastName" label="Last Name" />
            <FormInput required type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phoneNumber" label="Phone (xxx-xxx-xxxx)" />
            <FormInput required type="email" name="email" label="Email" />
            <FormInput required name="carMake" label="Car Make ex: 'Kia'" />
            <FormInput required name="carColor" label="Car Color" />
          </Grid>
          <br />
          <div className="checkout-bttns" style={{ display: "flex", justifyContent: "space-between" }}>
            <Link style={{textDecoration: "none"}} to="/cart">
              <button className="back-to-cart-bttn" variant="contained">
                BACK TO CART
              </button>
            </Link>
            <button className="next-bttn" type="submit" sx={{backgroundColor: "red"}} variant="contained">NEXT</button>
          </div>
        </form>
      </FormProvider>

      <Outlet />
    </div>
  )
}

export default ContactForm