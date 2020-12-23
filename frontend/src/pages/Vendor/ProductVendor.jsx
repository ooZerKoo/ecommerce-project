import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setProductDataById } from '../../services/redux/actions/vendor/product'

import ProductForm from '../../components/Forms/ProductForm'

const ProductListVendor = props => {

    const userToken = localStorage.getItem('userToken')
    if (!userToken && (props.user.user.role !== 'vendor')) {
        return <Redirect to='/user' />
    }

    const idProduct = typeof(props.idProduct) !== 'undefined' ? props.idProduct : 'add'

    if (!props.product.loading && props.product._id !== idProduct) {
        setTimeout(() => props.setProductData(idProduct), 1)
    }


    return <ProductForm idProduct={idProduct} />
}

const mapStateToProps = (state, extra) => ({
    product: state.product,
    idProduct: extra.match.params.id,
    user: state.user,
})

const mapDispatchToProps = dispatch => ({
    setProductData: (product) => setProductDataById(product)(dispatch),
})


const connected = connect(mapStateToProps, mapDispatchToProps)(ProductListVendor)

export default connected