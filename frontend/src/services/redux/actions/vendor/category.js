import { apiGetCategories } from '../../../api/vendor/category'
import { setLoading, setLoaded } from '../global'

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