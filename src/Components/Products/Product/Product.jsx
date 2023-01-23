import React from 'react';
import {Card, CardMedia, CardContent, CardActions, IconButton, Typography, Tooltip} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "../Products.css"


function Product({ product, onAddToCart }) {
  return (
    <div className='product-card'>
        <div className="image-container">
            <img className="product-media" src={product.image.url} alt={product.name} />
        </div>
        <div>
            <div className="card-content">
                <h3 sx={{fontSize: "25px", margin: 0}} gutterBottom>
                    {product.name}
                </h3>
                <h4 gutterBottom className="product-description-container">
                    <p className="product-description" dangerouslySetInnerHTML={{ __html: product.description}}></p>
                </h4>
                <h4 sx={{fontSize: "16px", fontWeight: 700, padding: "10px"}}>
                    {product.price.formatted_with_symbol}
                </h4>
            </div>
        </div>
        <div className="card-actions">
            {product.customizations ? 
            <Tooltip title="The customize button will take you to a single product page with custom options (currently being developed)" placement="bottom">
                <button className="customize-bttn">CUSTOMIZE</button>
            </Tooltip>
             : <button className="add-to-cart-bttn" onClick={() => onAddToCart(product.id, 1)}>ADD TO CART</button>}
        </div>
    </div>
  )
}

export default Product