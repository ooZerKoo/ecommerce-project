import React from 'react'
import { connect } from 'react-redux'

import ProductList from '../../components/Product/ProductList'
import Html from '../../components/Html/Html'
import { setCategoryData } from '../../services/redux/actions/category'

const Category = props => {

    const url = props.match.params.category
    const idCategory = props.category._id
    const name = props.category.name ? props.category.name : null
    const description = props.category.description ? props.category.description : null

    if (!props.category.loading && props.category.url !== url) {
        setTimeout(() => props.setCategoryData(url, props.pagination, true), 1)
    }

    return (
        <React.Fragment>
            <h1>{name}</h1>
            <h2><Html html={description} /></h2>
            <ProductList idCategory={idCategory} nameCategory={name} urlCategory={url} />
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    category: state.category
})

const mapDispatchToProps = dispatch => ({
    setCategoryData: (category) => setCategoryData(category)(dispatch),
})

const connected = connect(mapStateToProps, mapDispatchToProps)(Category)

export default connected