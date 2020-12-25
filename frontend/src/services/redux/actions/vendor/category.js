import { apiGetCategories, apiGetCategoryById, apiUpdateCategory } from '../../../api/vendor/category'
import { setCategory, updateCategories } from '../category'
import { setLoading, setLoaded, addError } from '../global'

export const setCategories = () => {
    return dispatch => {
        setLoading(dispatch, 'categories')
        apiGetCategories()
            .then(data => {
                setLoaded(dispatch, 'categories')
                dispatch({
                    type: 'SET_CATEGORIES',
                    payload: data
                })
            })
    }
}

export const setCategoryDataById = (idCategory) => {
    return dispatch => {
        setLoading(dispatch, 'category')
        if (idCategory !== 'add') {
            apiGetCategoryById(idCategory)
            .then(data => {
                setCategory(dispatch, data)
            })
        } else {
            setCategory(dispatch, {
                _id: 'add',
                name: '',
                description: '',
                url: '',
            })
        }
    }
}

export const updateCategory = (idCategory, category) => {
    return dispatch => {
        apiUpdateCategory(idCategory, category)
            .then(result => {
                if (result.status === 200) {
                    updateCategories(dispatch, result.data)
                    setCategory(dispatch, result.data)
                } else {
                    addError(dispatch, result.data)
                }
            })
    }
}