import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setCategoryDataById } from '../../services/redux/actions/vendor/category'

import CategoryForm from '../../components/Forms/CategoryForm'

const ProductListVendor = props => {

    const userToken = localStorage.getItem('userToken')
    if (!userToken && (props.user.user.role !== 'vendor')) {
        return <Redirect to='/user' />
    }

    const idCategory = typeof(props.idCategory) !== 'undefined' ? props.idCategory : 'add'

    if (!props.category.loading && props.category._id !== idCategory) {
        setTimeout(() => props.setCategoryDataById(idCategory), 1)
    }


    return <CategoryForm idCategory={idCategory} />
}

const mapStateToProps = (state, extra) => ({
    category: state.category,
    idCategory: extra.match.params.id,
    user: state.user,
})

const mapDispatchToProps = dispatch => ({
    setCategoryDataById: (idCategory) => setCategoryDataById(idCategory)(dispatch),
})


const connected = connect(mapStateToProps, mapDispatchToProps)(ProductListVendor)

export default connected