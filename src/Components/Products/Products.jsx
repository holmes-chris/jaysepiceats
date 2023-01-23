import React from "react";
import Grid from "@mui/material/Grid";
import Hero from "../Hero/Hero.js"
import Product from "./Product/Product.jsx";
import Loader from "../Loader/Loader.js"
import MenuDivider from "../../Components/MenuDivider/MenuDivider.js"
import DisplayProduct from "./Product/DisplayProduct.jsx"
import "./Products.css";
import ClosedStore from "../ClosedStore.js"
import { MenuItem, Card, CardContent, Container } from "@mui/material";




function Products({ products, onAddToCart, isStoreOpen, loading }) {
  //the products are divided into sections (entree,side,beverage).
  // The grouping of each section is dependent on if the product.name is in the section array below
  const entrees = ["Chicken Wings", "Cheeseburger", "Steak Sandwich", "Pizza", "Chicken Alfredo", "Shrimp Alfredo", "Shrimp and Grits"];
  const sides = ["Garlic Bread", "Salad", "Mashed Potatoes", "Roasted Garlic Potatoes", "Steak Fries" ]
  const beverages = ["Canned Soda"]
  
  return (
    <div>
      <Hero />
      <Loader loading={loading} />
      {isStoreOpen ? null : <ClosedStore />}
      <main className="product-page-container">
        {/* entree section */}
          <MenuDivider itemType="ENTREES"/>
          <div className="products-container">
            {/* if the store is open */}
            {isStoreOpen && products.map((product) => (
              <div className="products-grid" item key={product.id}>
                {entrees.includes(product.name) && <Product onAddToCart={onAddToCart} product={product}/>}
              </div>
            ))}
            {/* if the store is closed */}
            {!isStoreOpen && products.map((product) => (
              <div className="products-grid" item key={product.id}>
                {entrees.includes(product.name) && <DisplayProduct product={product}/>}
              </div>
            ))}
          </div>

          {/* Side section */}
          <MenuDivider itemType="SIDES"/>
          {/* if the store is open */}
          <div className="products-container">
            {/* if the store is open */}
            {isStoreOpen && products.map((product) => (
                <div className="products-grid" item key={product.id} >
                  {sides.includes(product.name) && <Product onAddToCart={onAddToCart} product={product}/>}
                </div>
            ))}
            {/* if the store is closed */}
            {!isStoreOpen && products.map((product) => (
              <div className="products-grid" item key={product.id} xs={12} >
                {sides.includes(product.name) && <DisplayProduct product={product}/>}
              </div>
            ))}
          </div>


          {/* beverage section */}
          <MenuDivider itemType="BEVERAGES"/>
          {/* if the store is open */}
          <div className="products-container" >
            {isStoreOpen && products.map((product) => (
              <div className="products-grid" item key={product.id} >
                {beverages.includes(product.name) && <Product onAddToCart={onAddToCart} product={product}/>}
              </div>
            ))}
            {/* if the store is closed */}
            {!isStoreOpen && products.map((product) => (
              <div className="products-grid" item key={product.id}>
                {beverages.includes(product.name) && <DisplayProduct product={product}/>}
              </div>
            ))}
          </div>
      </main>
    </div>
  )
}

export default Products