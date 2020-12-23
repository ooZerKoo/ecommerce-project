import React from 'react'
import { connect } from 'react-redux'

import { Card, Row, Skeleton, Col } from 'antd';
import { setProductsData } from '../../services/redux/actions/product';
import { NavLink } from 'react-router-dom';
import ProductPrice from './ProductPrice'

import PaginationCategory from '../Pagination/PaginationCategory'

const { Meta } = Card;

const ProductList = props => {
    
    if (!props.products.loading && props.idCategory && props.idCategory !== props.products.idCategory) {
        setTimeout(() => props.getProducts(props.idCategory, props.pagination), 1)
    }

    const renderProducts = () => {
        return props.products.list.map(item => renderProduct(item))
    }

    const renderProductsLoading = () => {
        const examples = [];
        for (let i = 0; i < 12; i++) {
            examples.push(i)
        }

        return examples.map(i => (
            <Col key={'product_' + i} xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                    loading={true}
                    hoverable
                    cover={<Skeleton.Image style={{ width: '240px' }} />}
                >
                    <Meta title={<Skeleton paragraph={{ rows: 1 }} active={true} />} />
                </Card>
            </Col>
        ))
    }

    const renderProduct = (item) => {
        return (
            <Col key={item._id} xs={24} sm={12} md={8} lg={6} xl={4}>
                <NavLink to={props.urlCategory + '/' + item.url}>
                    <Card
                        hoverable
                        cover={<img alt={item.name} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta
                            title={item.name}
                            description={<ProductPrice product={item} />}
                        />
                    </Card>
                </NavLink>
            </Col>
        )
    }

    const products = !props.products.loaded ? renderProductsLoading() : renderProducts()
    return (
        <React.Fragment>
            <Row gutter={[24, 24]}>
                {products}
            </Row>
            <Row gutter={[24, 24]} justify='center'>
                <PaginationCategory idCategory={props.idCategory} />
            </Row>
        </React.Fragment>
    )
}


const mapSateToProps = (state, extra) => ({
    products: state.products,
    idCategory: extra.idCategory,
    nameCategory: extra.nameCategory,
    urlCategory: extra.urlCategory,
    pagination: state.pagination,
})

const mapDispatchToProps = dispatch => ({
    getProducts: (idCategory, pagination) => setProductsData(idCategory, pagination)(dispatch)
})

const connected = connect(mapSateToProps, mapDispatchToProps)(ProductList)

export default connected