import React from 'react'
import { connect } from 'react-redux'

import CartRenderTotal from '../../components/Cart/CartRenderTotal'
import CartProductList from '../../components/Cart/CartProductList'

import { Link } from 'react-router-dom';
import '../../components/Cart/Cart.scss'

import { Row, Col } from 'antd'

const Cart = props => {
    return (
        <Row gutter={[36, 36]} style={{ padding: '2eM' }}>
            <Col xs={24}>
                <CartProductList doToggle={false}/>
                <CartRenderTotal />
                <Link to="/cart/address" className="ant-btn ant-btn-primary" type="primary">Finalizar Compra</Link>
            </Col>
        </Row>
    )
}

const connected = connect()(Cart)

export default connected