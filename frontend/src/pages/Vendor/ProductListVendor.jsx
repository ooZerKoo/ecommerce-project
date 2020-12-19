import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const ProductListVendor = props => {
    
    const token = props.user.token
    const user = props.user.user

    console.log(props.products);

    if (!token || !user.role || user.role === 'customer') {
        return <Redirect to='/user' />
    }


    return (
        <React.Fragment>
           
        </React.Fragment>
    )

}

const mapStateToProps = state => ({
    user: state.user,
    products: state.products,
})

const connected = connect(mapStateToProps)(ProductListVendor)

export default connected