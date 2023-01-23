import React from 'react';
import "./review.css"

function Review({ checkoutToken }) {
  return (
    <div className="review-container">
        <div className="review-content-container">
            <h2 style={{fontWeight: 500, margin: "auto"}}>Order Sumary</h2>
            <div className="cart-items-box">
                {checkoutToken.line_items.map((product) => (
                    <div className="review-cart-item">
                        <div>
                            <h3 style={{fontWeight: 400, fontSize: "17px"}}>{product.name}</h3>
                            <h4 style={{fontWeight: 300, color: "grey", fontSize: "14px"}}>{`Quantity: ${product.quantity}`}</h4>
                        </div>
                        <div style={{display: "flex", marginLeft: "auto"}}>
                            <h4 style={{margin: "auto", fontWeight: 400, padding: "0 20px 0 10px"}}>{product.line_total.formatted_with_symbol}</h4>
                        </div>
                    </div>
                ))}
            </div>
            <div className="review-cart-total">
                <h2 style={{fontWeight: 500}}>Total</h2>
                <h2 style={{fontSize: "20px", fontWeight: 600}}>{checkoutToken.subtotal.formatted_with_symbol}</h2>
            </div>
        </div>

    </div>
  )
}

export default Review