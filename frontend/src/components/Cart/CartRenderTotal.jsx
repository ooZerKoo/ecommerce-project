import React from 'react'
import { connect } from 'react-redux'

import { Row, Col } from 'antd';

const CartRenderTotal = props => {
 
        return (
            <Row gutter={32} className="cart-total" >
                <Col span={12} className="text-right"><strong>Total:</strong></Col>
                <Col span={12}><strong>{props.cart.total} {props.cart.symbol}</strong></Col>
            </Row>
        )
}

const mapSateToProps = state => ({
    cart: state.cart
})

const connected = connect(mapSateToProps)(CartRenderTotal)

export default connected