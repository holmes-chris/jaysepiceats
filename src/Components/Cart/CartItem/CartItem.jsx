import React from 'react';
import "../Cart.css"

function CartItem({item, onUpdateCartQty}) {
  return (
    <div className="cart-item-container">
        <div className="cart-item-wrapper">
            <div className="cart-image-wrapper">
                <img className="cart-item-image" src={item.image.url}/>
            </div>
            <div className="cart-item-details">
                <div className="detail-text">
                    <h5>{item.name}</h5>
                    <h5>Quantity: {item.quantity}</h5>
                    <h5 className="cart-item-price">${(item.price.raw * item.quantity).toFixed(2)}</h5>
                    {/* {product.customizations ? <p>toppings, sauces, etc.</p> : null} */}
                </div>
                <div className="cart-actions">
                    <button onClick={() => onUpdateCartQty(item.id, item.quantity -1)} className="decrement-quantity">-</button>
                    <button onClick={() => onUpdateCartQty(item.id, item.quantity +1)} className="increment-quantity">+</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem