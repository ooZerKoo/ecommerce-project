import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import { toggleCart } from '../../services/redux/actions/cart'
import { Drawer } from 'antd';
import CartRenderTotal from './CartRenderTotal'
import CartProductList from './CartProductList'

import './Cart.scss'

const CartDrawer = props => {
    return (
        <Drawer
            width={640}
            placement="right"
            onClose={() => props.toggleCart()}
            visible={props.cart.open}
        >
            <h3>Resumen del Carrito</h3>
            <CartProductList doToggle={true} />
            <CartRenderTotal />

            {props.cart.products.length > 0 && <Link to="/cart" className="ant-btn ant-btn-primary" type="primary">Finalizar Compra</Link>}
        </Drawer>
    )
}

const mapSateToProps = state => ({
    cart: state.cart
})
const mapDispatchToProps = dispatch => ({
    toggleCart: () => toggleCart(dispatch),
})

const connected = connect(mapSateToProps, mapDispatchToProps)(CartDrawer)

export default connected