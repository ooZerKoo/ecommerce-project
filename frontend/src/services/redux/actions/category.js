import { apiGetCategoryByUrl, apiGetTotalProductsCategory } from '../../api/category'
import { setLoading, setBreadCrumb, setTotalPagination, setPagePagination, setLimitPagination } from './global'
import { setProductsData } from './product'


export const setCategoryData = (category) => {
    return dispatch => {
        setLoading(dispatch, 'category')
        setLoading(dispatch, 'breadcrumb')
        apiGetCategoryByUrl(category)
            .then(data => {
                setBreadCrumb(dispatch, data)
                setCategory(dispatch, data)
                setTotalPaginationCategory(data._id)(dispatch)
            })
    }
}

export const setCategory = (dispatch, category) => {
    return dispatch({
        type: 'SET_CATEGORY',
        payload: category
    })
}

export const setTotalPaginationCategory = idCategory => {
    return dispatch => {
        apiGetTotalProductsCategory(idCategory)
            .then(total => setTotalPagination(dispatch, total))
    }
}

export const updatePaginationCategory = (page, limit, idCategory) => {
    return dispatch => {
        setPagePagination(dispatch, page)
        setLimitPagination(dispatch, limit)
        setProductsData(idCategory, {page, limit})(dispatch)
    }
}