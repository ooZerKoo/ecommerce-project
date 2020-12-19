import React from 'react'
import { connect } from 'react-redux'

const ProductVendor = props => {


    return (
        <React.Fragment>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    product: state.product
})

const mapDispatchToProps = dispatch => ({
})

const connected = connect(mapStateToProps, mapDispatchToProps)(ProductVendor)

export default connected