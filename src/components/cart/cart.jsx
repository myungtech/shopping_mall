import React, { Component } from "react";
import './cart.css';

class Cart extends Component {

    render() {
        const cart = this.props.cart;
        const totalAmount = this.props.totalAmount;

        return (
            <>
                {cart.map(item => (
                    <div className="cartContainer">
                        <div className={`${item.color}`}>
                            <i className="fas fa-shoe-prints" ></i>
                            <div className="cartItem"> {item.name}</div>
                        </div>
                        <div>
                            quantity: {item.quantity}
                        </div>
                    </div>
                ))
                }
                <div className="cartTotalAmout">
                    total: {totalAmount} 원
                </div>
            </>
        );
    }
}


export default Cart;