import { apiGetProductsCategory, apiGetProductByUrl } from '../../api/product'
import { setLoading, setBreadCrumb } from './global'


export const setProductData = (product) => {
    return dispatch => {
        setLoading(dispatch, 'product')
        setLoading(dispatch, 'breadcrumb')
        apiGetProductByUrl(product)
            .then(data => {
                setBreadCrumb(dispatch, data)
                setProduct(dispatch, data)
            })
    }
}

export const setProductsData = (idCategory, pagination = {}) => {
    return dispatch => {
        setLoading(dispatch, 'products')
        apiGetProductsCategory(idCategory, pagination)
            .then(data => {
                setProducts(dispatch, data, idCategory)
            })
    }
}

export const setProducts = (dispatch, products, idCategory) => {
    const data = {
        idCategory: idCategory,
        list: products
    }
    return dispatch({
        type: 'SET_PRODUCTS',
        payload: data
    })
}

export const setProduct = (dispatch, product) => {
    return dispatch({
        type: 'SET_PRODUCT',
        payload: product
    })
}