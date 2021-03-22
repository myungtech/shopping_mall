import React, { Component } from 'react';
import './item.css';

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: {}
        };
    };

    addToCart = () => {

        this.setState({
            selectedProduct: {
                id: this.props.product.id,
                name: this.props.product.name,
                price: this.props.product.price,
                color: this.props.product.color,
                quantity: this.props.quantity,
            }
        }, () => {
            this.props.handleAddToCart(this.state.selectedProduct);
        })
    };

    render() {
        const { id, name, price, color, quantity } = this.props.product;

        return (
            <>
                <div className="itemContainer">
                    <div className={`${color}`}>
                        <i className="fas fa-shoe-prints"></i>
                        <div className="itemName">{name}</div>
                    </div>
                    <div className="itemPrice">{price} 원</div>
                </div >
                <button className="itemButton" onClick={this.addToCart}>Go Shopping Cart</button>
            </>
        );
    };
}

export default Item;