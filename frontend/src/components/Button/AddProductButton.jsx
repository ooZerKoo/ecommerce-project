import React from 'react'
import { connect } from 'react-redux'

import { Button } from 'antd';
import { addToCart } from '../../services/redux/actions/cart'
import { setButton, setLoading } from '../../services/redux/actions/global'
import { ShoppingCartOutlined } from '@ant-design/icons';

const AddProductButton = props => {
    var button = props.button.filter(v => v.idProduct === props.idProduct)
    if (button) {
        button = button[0]
    } else {
        props.setButton(props.idProduct)
    }

    return (
        <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            loading={button ? button.loading : false}
            onClick={() => props.addToCart(props.cart.token, props.idProduct, 1, true)}
        >
            Añadir al Carrito
        </Button>
    )
}

const mapSateToProps = (state, extra) => ({
    idProduct: extra.idProduct,
    button: state.button,
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    setButton: (idProduct) => setButton(dispatch, idProduct),
    addToCart: (cartToken, idProduct, quantity, toggle) => addToCart(cartToken, idProduct, quantity, toggle)(dispatch),
    setLoading: (idProduct) => setLoading(dispatch, 'button', idProduct)
})

const connected = connect(mapSateToProps, mapDispatchToProps)(AddProductButton)

export default connected