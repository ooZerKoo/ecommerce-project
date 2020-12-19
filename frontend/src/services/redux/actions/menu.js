import { setLoading, setBreadCrumb } from './global'
import { apiGetCategories } from '../../api/category'

export const setMenu = () => {
    return (dispatch) => {
        setLoading(dispatch, 'menu')
        apiGetCategories()
            .then(data => {
                const r = []
                for (let i in data) {
                    setBreadCrumb(dispatch, data[i])
                    let item = {
                        key: data[i]._id,
                        name: data[i].name,
                        url: '/' + data[i].url,
                        logged: true,
                        noLogged: true
                    }
                    r.push(item)
                }
                dispatch({
                    type: 'SET_MENU',
                    payload: r,
                })
            })
    }
}