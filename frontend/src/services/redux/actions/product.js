import { apiGetProductsCategory } from '../../api/category'
import { apiGetProductByUrl } from '../../api/product'
import { setLoading, setBreadCrumb } from './global'


export const setProductDataByUrl = (urlProduct) => {
    return dispatch => {
        setLoading(dispatch, 'product')
        setLoading(dispatch, 'breadcrumb')
        apiGetProductByUrl(urlProduct)
            .then(data => {
                setBreadCrumb(dispatch, {
                    name: data.name,
                    url: data.url
                })
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

export const updateProducts = (dispatch, product) => {
    return dispatch({
        type: 'UPDATE_PRODUCTS',
        payload: product
    })
}

export const setProduct = (dispatch, product) => {
    return dispatch({
        type: 'SET_PRODUCT',
        payload: product
    })
}

