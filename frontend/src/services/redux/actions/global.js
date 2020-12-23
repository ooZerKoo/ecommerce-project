export const setLoading = (dispatch, typeName, id = null) => {
    return dispatch({
        type: `SET_${typeName.toUpperCase()}_LOADING`,
        payload: id
    })
}

export const setLoaded = (dispatch, typeName, id = null) => {
    return dispatch({
        type: `SET_${typeName.toUpperCase()}_LOADED`,
        payload: id
    })
}

export const setBreadCrumb = (dispatch, data) => {
    return dispatch({
        type: 'SET_BREADCRUMB',
        payload: data
    })
}

export const setButton = (dispatch, idProduct) => {
    const data = {
        loading: false,
        idProduct: idProduct
    }
    return dispatch({
        type: 'SET_BUTTON',
        payload: data
    })
}

export const resetError = (dispatch) => {
    return dispatch({
        type: 'RESET_ERROR_MESSAGES',
    })
}

export const addError = (dispatch, data) => {
    return dispatch({
        type: 'ADD_ERROR',
        payload: data
    })
}

export const setTotalPagination = (dispatch, total) => {
    return dispatch({
        type: 'SET_TOTAL_PAGINATION',
        payload: total
    })
}

export const setPagePagination = (dispatch, total) => {
    return dispatch({
        type: 'SET_PAGE_PAGINATION',
        payload: total 
    })
}

export const setLimitPagination = (dispatch, total) => {
    return dispatch({
        type: 'SET_LIMIT_PAGINATION',
        payload: total
    })
}

export const resetPagination = (dispatch) => {
    return dispatch({
        type: 'RESET_PAGINATION',
    })
}

export const updateFilters = (dispatch, filter) => {
    return dispatch({
        type: 'SET_FILTER_FILTERS',
        payload: filter
    })
}

export const resetFilters = (dispatch, filter) => {
    return dispatch({
        type: 'RESET_FILTER_FILTERS'
    })
}