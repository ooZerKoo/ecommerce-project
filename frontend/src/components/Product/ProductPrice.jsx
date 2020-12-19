import React from 'react'
import { connect } from 'react-redux'

import './ProductPrice.scss'

const ProductList = props => {

    const getPrices = () => {
        const item = props.product
        if (item.discount > 0) {
            return (
                <div className='price_container'>
                    <span className='price'>{item.finalPrice} {item.symbol}</span>
                    <span className='price_before'>{item.price} {item.symbol}</span>
                    <span className='discount'>-{item.discount} {item.discountType === 'percent' ? '%' : item.symbol}</span>
                </div>
            )
        } else {
            return (
                <div className='price_container'>
                    <span className='price'>{item.finalPrice} {item.symbol}</span>
                </div>
            )

        }
    }
    return getPrices()
}


const mapSateToProps = (state, extra) => ({
    product: extra.product
})

const connected = connect(mapSateToProps, null)(ProductList)

export default connected