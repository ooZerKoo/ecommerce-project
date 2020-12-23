import { apiGetAllProducts, apiGetTotalAllProducts, apiGetProductById, apiUpdateProduct } from '../../../api/vendor/product'
import { setLoading, setBreadCrumb, setTotalPagination, setPagePagination, setLimitPagination, addError } from '../global'
import { setProduct, setProducts, updateProducts } from '../product'


// PRODUCTS
export const setProductDataById = (idProduct) => {
    return dispatch => {
        setLoading(dispatch, 'product')
        setLoading(dispatch, 'breadcrumb')
        if (idProduct !== 'add') {
            apiGetProductById(idProduct)
            .then(data => {
                setBreadCrumb(dispatch, {
                    name: data.name,
                    url: data._id
                })
                setProduct(dispatch, data)
            })
        } else {
            setProduct(dispatch, {
                _id: 'add',
                name: '',
                description: '',
                images: [],
                url:  '',
                category: '',
                quantity: 1,
                symbol: '€',
                price: 0,
                discount: 0,
                discountType: 'amount'
            })
        }
    }
}

export const getAllProducts = (pagination, id) => {
    return dispatch => {
        setLoading(dispatch, 'products')
        setTotalPaginationProducts()(dispatch)
        apiGetAllProducts(pagination)
            .then(data => setProducts(dispatch, data, id))
    }
}

export const setTotalPaginationProducts = () => {
    return dispatch => {
        apiGetTotalAllProducts()
            .then(total => setTotalPagination(dispatch, total))
    }
}

export const updatePaginationProduct = (page, limit) => {
    return dispatch => {
        setPagePagination(dispatch, page)
        setLimitPagination(dispatch, limit)
        getAllProducts(page, limit)(dispatch)
    }
}

export const updateProduct = (idProduct, product) => {
    return dispatch => {
        apiUpdateProduct(idProduct, product)
            .then(result => {
                if (result.status === 200) {
                    updateProducts(dispatch, result.data)
                    setProduct(dispatch, result.data)
                } else {
                    addError(dispatch, result.data)
                }
            })
    }
}

export const setImagesData = (dispatch, list) => {
    dispatch({
        type: 'SET_PRODUCT_IMAGES',
        payload: list
    })
}

// pagination
export const updatePaginationVendorProducts = (page, limit, idCategory) => {
    return dispatch => {
        setPagePagination(dispatch, page)
        setLimitPagination(dispatch, limit)
        getAllProducts({page, limit})(dispatch)
    }
}