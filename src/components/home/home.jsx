import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = props => {
    if (props.products) {
        return <RenderProducts products={props.products} />
    } else {
        return <RenderLoading />
    }
}

const RenderProducts = props => {

    return props.products.map((product) => {
        return (
            <div className="products">
                <Link
                    className={`${product.color}`}
                    to={`/item/${product.id}`} >
                    <i className="fas fa-shoe-prints" ></i>
                    <div className="productsName">
                        <p className="productsTitle">{product.name}</p>
                    </div>
                </Link >
                <p className="productsPrice">{product.price.toLocaleString()} 원</p>
            </div >
        );
    })
};

const RenderLoading = props => (
    <div>Loading...</div>
);
export default Home;