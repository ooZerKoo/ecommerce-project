import React from 'react'
import { connect } from 'react-redux'

import { removeProductCart, toggleCart, addToCart } from '../../services/redux/actions/cart'
import { Link } from 'react-router-dom';

import { Badge, List } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ProductPrice from '../Product/ProductPrice'

const CartProductList = props => {
    const getName = (item) => {
        return (
            <React.Fragment>
                <Badge count={item.quantity} style={{ marginRight: '0.8eM' }} />
                <Link key='view' to={'/' + item.url} onClick={() => props.toggleCart()}>
                    {item.name}
                </Link>
            </React.Fragment>
        )
    }

    return (
        <List
            dataSource={props.cart.products}
            bordered
            renderItem={item => (
                <List.Item
                    key={item.id}
                    actions={
                        [
                            <MinusOutlined onClick={() => props.addToCart(props.cart.token, item._id, -1, props.doToggle)} />,
                            <DeleteOutlined onClick={() => props.deleteProductCart(props.cart.token, item._id)} />,
                            <PlusOutlined onClick={() => props.addToCart(props.cart.token, item._id, +1, props.doToggle)} />
                        ]
                    }
                >
                    <List.Item.Meta
                        title={getName(item)}
                        description={<ProductPrice product={item} />}
                    />
                </List.Item>
            )}
        />
    )
}

const mapSateToProps = (state, extra) => ({
    cart: state.cart,
    doToggle: extra.doToggle
})

const mapDispatchToProps = dispatch => ({
    toggleCart: () => toggleCart(dispatch),
    deleteProductCart: (token, idProduct) => removeProductCart(token, idProduct)(dispatch),
    addToCart: (cartToken, idProduct, quantity, toggle) => addToCart(cartToken, idProduct, quantity, toggle)(dispatch),
})

const connected = connect(mapSateToProps, mapDispatchToProps)(CartProductList)

export default connected