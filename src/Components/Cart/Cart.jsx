import React from 'react';
import "./Cart.css"
import CartItem from "./CartItem/CartItem.jsx"
import { Box, Container, Typography, Grid } from "@mui/material";
import {Outlet, Link} from "react-router-dom";

function Cart({cart, isStoreOpen, handleUpdateCartQty, handleRemoveFromCart}) {
    
    function EmptyCart() {
        return (
            <div className="empty-cart-container">
                <h2 className="cart-header-status">There are currently no items in your shopping cart.</h2>
                <Link to="/" style={{textDecoration: "none", margin: "auto", marginTop: "40px", height: "40px"}}>
                    <button className="go-to-menu-bttn">Go To Menu</button>
                </Link>
            <Outlet />
            </div>
        )
    }

    function FilledCart() {
        return (
            <div className="cart-content-wrapper">
                <div className="cart-outer-container">
                    {cart.line_items.map((item) => (
                        <div style={{width: "100%"}} key={item.id}>
                            <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                        </div>
                    ))}
                </div>
                <div className="subtotal-container">
                    <h3>Subtotal: {cart.subtotal.formatted_with_symbol}</h3>
                    <div className="checkout-bttn-container" style={{display: "flex", flexDirection: "column"}}>
                        <Link style={{width: "150px", margin: "auto"}} to="/checkout">
                            <button className={isStoreOpen ? "checkout-bttn-open" : "checkout-bttn-closed"} disabled={isStoreOpen ? false : true}>Checkout</button>
                        </Link>
                        {isStoreOpen ? null : <h3 style={{color: "grey", margin: "15px auto"}}>Jay's Epic Eats is currently closed</h3>}
                    </div>
                </div>
            </div>
        )
    }

    if (!cart.line_items) return "Loading..."

  return (
    <div style={{height: "1000px"}}>
        <div className="cart-container">
            <h1 className="cart-header">YOUR SHOPPING CART</h1>
            <div>
                { !cart.line_items.length ? <EmptyCart /> : <FilledCart />}
            </div>
        </div>
    </div>

  )
}

export default Cart