import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';
import Cart from './components/cart/cart';
import Home from './components/home/home';
import Item from './components/item/item';
import Nav from './components/nav/nav';
import shopData from './SHOP_DATA.json';

class App extends Component {
  constructor() {
    super();
    //state 초기값 설정
    this.state = {
      products: shopData,
      cart: [],
      quantity: 1,
      totalAmount: 0,
    };

  };


  //장바구니에 선택한 물품을 추가하는 method
  handleAddToCart = (selectedProducts) => {

    let cartItem = this.state.cart;
    const productID = selectedProducts.id;

    if (this.checkProduct(productID)) {
      let index = cartItem.findIndex(item => {
        return item.id === productID;
      });

      cartItem[index].quantity += 1;
      // console.log(cartItem[index].quantity);
      this.setState({
        cart: cartItem
      });

    } else {
      cartItem.push(selectedProducts);
      this.setState({
        cart: cartItem,
        quantity: 1
      });
    }
  }

  //장바구니에 이미 제품이 있는지 확인하는 method
  //배열요소중 하나라도 특정 조건을 만족하는가 array.some
  checkProduct = (id) => {
    let cart = this.state.cart;
    return cart.some(item => {
      return item.id === id;
    });
  };

  // 장바구니에 담긴 물품들의 가격 총합을 구하는 method
  sumTotalAmount = () => {
    let cart = this.state.cart;
    // console.log(cart);
    // console.log(`sumTotalAmount =>>${cart}`);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * Number(cart[i].quantity);
      console.log(total);
    }
    this.setState({
      totalAmount: total
    });
  }

  componentDidMount = () => {
    // localStorage.clear();
    //cart state가 local storage에 있으면 불러오기
    let cart = localStorage.cart;

    if (cart) {
      this.setState(prevState => ({
        cart: JSON.parse(cart)
      }), () => {
        this.sumTotalAmount();
      })
    }
    // console.log(this.state.totalAmount);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.products.cart !== this.state.cart) {
      localStorage.cart = JSON.stringify(this.state.cart);
    }
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route path={['/', '/home']} exact>
              <Home products={this.state.products} />
            </Route>
            <Route path={'/cart'} exact>
              <Cart
                cart={this.state.cart}
                totalAmount={this.state.totalAmount}
              />
            </Route>

            {this.state.products.map(product => {
              return (
                <Route exact path={`/item/${product.id}`}
                  render={() => {
                    return (
                      <Item
                        key={product.id}
                        product={product}
                        quantity={this.state.quantity}
                        handleAddToCart={this.handleAddToCart}
                      />
                    );
                  }
                  }
                />
              );
            })
            }
          </Switch>
        </BrowserRouter>
      </>
    )
  }

}

export default App;
