import React from 'react'
import { connect } from 'react-redux'

import { removeProductCart, toggleCart, addToCart } from '../../services/redux/actions/cart'
import { Link } from 'react-router-dom';

import { Drawer, Badge, List, Row, Col } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ProductPrice from '../Product/ProductPrice'

import './CartContent.scss'

const CartContent = props => {
    const getName = (item) => {
        return (
            <React.Fragment>    
                <Badge count={item.quantity} style={{marginRight: '0.8eM'}} />
                <Link key='view' to={'/' + item.url} onClick={() => props.toggleCart()}>
                    {item.name}
                </Link>
            </React.Fragment>
        )
    }

    const renderTotal = () => {
        return (
            <Row gutter={32} className="cart-total" >
                <Col span={12} className="text-right"><strong>Total:</strong></Col>
                <Col span={12}><strong>{props.cart.total} {props.cart.symbol}</strong></Col>
            </Row>
        )
    }

    const renderProducts = () => {
        return (
            <List
                dataSource={props.cart.products}
                bordered
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={
                            [
                                <MinusOutlined onClick={() => props.addToCart(props.cart.token, item._id, -1)} />,
                                <DeleteOutlined onClick={() => props.deleteProductCart(props.cart.token, item._id)} />,
                                <PlusOutlined onClick={() => props.addToCart(props.cart.token, item._id, +1)} />
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

    return (
        <Drawer
            width={640}
            placement="right"
            onClose={() => props.toggleCart()}
            visible={props.cart.open}
        >
            <h3>Resumen del Carrito</h3>
            {renderProducts()}
            {renderTotal()}
        </Drawer>
    )
}

const mapSateToProps = state => ({
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    toggleCart: () => toggleCart(dispatch),
    deleteProductCart: (token, idProduct) => removeProductCart(token, idProduct)(dispatch),
    addToCart: (cartToken, idProduct, quantity) => addToCart(cartToken, idProduct, quantity)(dispatch),
})

const connected = connect(mapSateToProps, mapDispatchToProps)(CartContent)

export default connected