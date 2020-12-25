import React from 'react'
import { connect } from 'react-redux'

import AddProductButton from '../../components/Button/AddProductButton'
import ProductPrice from '../../components/Product/ProductPrice'
import Html from '../../components/Html/Html'

import { setProductDataByUrl } from '../../services/redux/actions/product'
import { Row, Col, Carousel, Image, Skeleton } from 'antd'

import './Product.scss'

const Product = props => {

    const urlProduct = props.match.params.product
    const idProduct = props.product._id
    const imagesUrl = process.env.REACT_APP_API_PROTOCOL + process.env.REACT_APP_API_URL + process.env.REACT_APP_UPLOADS + '/product/'

    if (!props.product.loading && props.product.url !== urlProduct) {
        setTimeout(() => props.setProductData(urlProduct), 1)
    }

    if (!props.product.loaded) {
        return (
            <Row gutter={[36, 36]} style={{ padding: '2eM' }}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Skeleton.Image style={{with: '100%'}} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                    <Skeleton />
                </Col>
            </Row>
        )
    }

    return (
        <Row gutter={[36, 36]} style={{ padding: '2eM' }}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Carousel draggable={true} effect="fade">
                    {props.product.images.map((item, index) => (
                        <Image style={{ cursor: 'zoom-in' }} key={index} src={imagesUrl + item} alt={props.product.name} />
                    ))}
                </Carousel>
            </Col>
            <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                <h1>{props.product.name}</h1>
                <Html html={props.product.description}/>
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
    setProductData: (product) => setProductDataByUrl(product)(dispatch),
})

const connected = connect(mapStateToProps, mapDispatchToProps)(Product)

export default connected