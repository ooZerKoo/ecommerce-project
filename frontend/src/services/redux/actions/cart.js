import { apiGetCart, apiAddToCart, apiRemoveProductCart } from '../../api/cart'
import { setLoading, setLoaded } from './global'


export const toggleCart = (dispatch) => {
    return dispatch({
        type: 'TOGGLE_CART'
    })
}

export const openCart = (dispatch) => {
    return dispatch({
        type: 'OPEN_CART'
    })
}

export const setCart = (cartToken) => {
    return dispatch => {
        setLoading(dispatch, 'cart')
        apiGetCart(cartToken)
            .then(items => {
                updateCart(dispatch, items)
            })
    }
}

export const addToCart = (token, idProduct, quantity) => {
    return dispatch => {
        setLoading(dispatch, 'button', idProduct)
        apiAddToCart(token, idProduct, quantity)
            .then(items => {
                updateCart(dispatch, items)
                setLoaded(dispatch, 'button', idProduct)
                openCart(dispatch)
            })
    }
}

export const removeProductCart = (token, idProduct) => {
    return dispatch => {
        setLoading(dispatch, 'button', idProduct)
        apiRemoveProductCart(token, idProduct)
            .then(items => {
                updateCart(dispatch, items)
                setLoaded(dispatch, 'button', idProduct)
            })
    }
}

const updateCart = (dispatch, items) => {
    localStorage.setItem('cartToken', items.token)
    dispatch({
        type: 'SET_CART',
        payload: items,
    })
}