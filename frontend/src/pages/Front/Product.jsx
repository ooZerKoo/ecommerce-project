import React from 'react'
import { connect } from 'react-redux'

import AddProductButton from '../../components/Button/AddProductButton'
import ProductPrice from '../../components/Product/ProductPrice'

import { setProductData } from '../../services/redux/actions/product'
import { Row, Col } from 'antd'


const Product = props => {

    const urlProduct = props.match.params.product
    const idProduct = props.product._id

    if (!props.product.loading && props.product.url !== urlProduct) {
        setTimeout(() => props.setProductData(urlProduct), 1)
    }

    return (
        <Row gutter={[36, 36]} style={{ padding: '2eM' }}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            </Col>
            <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                <h1>{props.product.name}</h1>
                <p>{props.product.description}</p>
                <ProductPrice product={props.product} />
                <AddProductButton idProduct={idProduct} />
            </Col>
        </Row>
    )
}

const mapStateToProps = state => ({
    product: state.product
})

const mapDispatchToProps = dispatch => ({
    setProductData: (product) => setProductData(product)(dispatch),
})

const connected = connect(mapStateToProps, mapDispatchToProps)(Product)

export default connected