import './App.css';

import React from 'react'
import { connect } from 'react-redux'

import { setCart } from './services/redux/actions/cart'
import { setMenu } from './services/redux/actions/menu'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HeaderContent from './components/Header/HeaderContent'

import Home from './pages/Front/Home'
import Category from './pages/Front/Category'
import Product from './pages/Front/Product'
import Login from './pages/Front/Login'
import User from './pages/Front/User'

// vendor
import ProductListVendor from './pages/Vendor/ProductListVendor'
import CartContent from './components/Cart/CartContent'

import './App.scss';
import 'antd/dist/antd.css';

import { Layout, notification } from 'antd';
import { setUserToken } from './services/redux/actions/user';
const { Content, Footer } = Layout;


const App = props => {

	const userToken = localStorage.getItem('userToken')
	if (!props.user.loaded && !props.user.loading && userToken && userToken !== props.user.token) {
		props.setUser(userToken)
	}

	if (!props.menu.loaded && !props.menu.loading) {
		props.setMenu()
	}
	
	const cartToken = localStorage.getItem('cartToken')
	if (!props.cart.loaded && !props.cart.loading && (!cartToken || cartToken !== props.cart.token)) {
		props.setCart(cartToken)
	}

	if (props.error !== '') {
		notification['error']({
			message: props.error
		})
	}

	return (
		<BrowserRouter>
			<Layout className="layout">
				<HeaderContent />
				<Content>
					<Switch>
						<Route path="/login" component={Login} exact />
						<Route path="/user" component={User} exact />
						<Route path="/user/products" component={ProductListVendor} exact />
						<Route path="/user/orders" component={ProductListVendor} exact />
						<Route path="/user/categories" component={ProductListVendor} exact />
						<Route path="/user/customers" component={ProductListVendor} exact />
						<Route path="/:category/:product" component={Product} exact />
						<Route path="/:category" component={Category} exact />
						<Route path="/" component={Home} exact />
					</Switch>
				</Content>
				<CartContent />
				<Footer className='text-center'>Ant Design ©2018 Created by Ant UED</Footer>
			</Layout>
		</BrowserRouter>
	);
}

const mapStateToProps = state => ({
	user: state.user,
	menu: state.menu,
	cart: state.cart,
	error: state.error,
})

const mapDispatchToProps = dispatch => ({
    setMenu: () => setMenu()(dispatch),
	setCart: (cartToken) => setCart(cartToken)(dispatch),
	setUser: (token) => setUserToken(token)(dispatch)
})

const connected = connect(mapStateToProps, mapDispatchToProps)(App)

export default connected