import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Products from "./Components/Products/Products";
import "./Components/Loader/Loader.css"
import Navbar from "./Components/Navbar/Navbar.js";
import Cart from "./Components/Cart/Cart.jsx";
import Contact from "./Pages/Contact/Contact.js";
import About from "./Pages/About/About.js";
import Login from "./Pages/Login/Login.js";
import Admin from "./Pages/Admin/Admin.js";
import Checkout from "./Pages/CheckoutForm/Checkout/Checkout.js"
import { commerce } from "./lib/commerce.js";
import {customizations} from "./lib/customizations.js"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import emailjs from '@emailjs/browser';


function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [storeStatus, setStoreStatus] = useState(false);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);


  function changeStoreStatus() {
    setIsStoreOpen(!isStoreOpen);
    setStoreStatus(!storeStatus)
  }
  //this array represents items that will be customizable in the future (toppings, sauces, etc.)
  const customizableItems = ["Chicken Wings", "Cheeseburger", "Steak Sandwich", "Pizza"];

  
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    //inserting the customization options for each product inside the response object
    data.forEach((product) => {
      if (customizableItems.includes(product.name)) {
      Object.defineProperty(product, "customizations", {
        value : customizations
      })}
    })
    setProducts(data);
  }

  //this function fetches the cart from commerce.js backend
  const fetchCart = async () => {
    setLoading(true)
    setCart(await commerce.cart.retrieve())
    setLoading(false)
  }

  //this function adds product to cart
  const handleAddToCart = async (productId, quantity) => {
    setLoading(true)
    const item = await commerce.cart.add(productId, quantity);
    setCart(item);
    setLoading(false)
  };

  //updates the quantity based on click in cartItem
  const handleUpdateCartQty = async (productId, quantity) => {
    setLoading(true)
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response)
    setLoading(false)
  }

  //this function resets the cart after a successful checkout
  const refreshCart = async () => {
    setLoading(true)
    const newCart = await commerce.cart.refresh();
    setCart(newCart)
    setLoading(false)
  }


  //this function captures the checkout info and resets the cart
  //takes in the checkoutTokenId and the order object generated during checkout
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    setLoading(true)
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      // sendEmail();
      refreshCart();
    setLoading(false)
    } catch (error) {
      console.log(error)
        setErrorMessage(error.data)
    }
  }

  //happens immediately upon component mount
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  
  return (
    <BrowserRouter>
            <Navbar 
              storeStatus={storeStatus} 
              changeStoreStatus={changeStoreStatus} 
              isStoreOpen={isStoreOpen} 
              totalItems={cart.total_items} 
            />
      <main>
      <Routes>
            <Route path="/" element={<Products 
                products={products} 
                onAddToCart={handleAddToCart} 
                isStoreOpen={isStoreOpen} 
                loading={loading}
              />} 
            />
            <Route path="cart" element={<Cart 
                cart={cart} 
                products={products} 
                isStoreOpen={isStoreOpen} 
                handleUpdateCartQty={handleUpdateCartQty} 
              />} 
            />
            <Route path="about" element={<About />} />

            <Route path="login" element={<Login />} />

            <Route path="contact" element={<Contact />} />

            <Route path="admin" element={<Admin 
                storeStatus={storeStatus} 
                changeStoreStatus={changeStoreStatus} 
              />} 
            />

            <Route path="checkout"
              element={<Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />} 
            />
      </Routes>
      </main>
    </BrowserRouter>
    
  )
}

export default App;