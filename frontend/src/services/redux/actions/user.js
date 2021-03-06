import { apiDeleteAddress, apiGetAddresses, apiGetUser, apiSetLogin, apiSetRegister, apiUpdateAddress } from '../../api/user'
import { addError, resetError, setLoaded, setLoading } from './global'

export const setLogout = (dispatch) => {
    localStorage.removeItem('userToken')
    return dispatch({
        type: 'SET_LOGOUT'
    })
}

export const setLogin = (user, password) => {
    return dispatch => {
        resetError(dispatch)
        apiSetLogin(user, password)
            .then(response => {
                if (response.status === 200) {
                    const token = response.data
                    setLoading(dispatch, 'user')
                    setUserToken(token)(dispatch)
                } else {
                    addError(dispatch, response.data)
                }
            })
            .catch(console.error)
    }
}

export const setRegister = (user, email, password, password2) => {
    return dispatch => {
        apiSetRegister(user, email, password, password2)
            .then(response => {
                if (response.status === 200) {
                    const token = response.data
                    setLoading(dispatch, 'user')
                    setUserToken(token)(dispatch)
                } else {
                    addError(dispatch, response.data)
                }
            })
            .catch(console.error)
    }
}

export const setUserData = (dispatch, user) => {
    setLoaded(dispatch, 'user')
    return dispatch({
        type: 'SET_USER',
        payload: user
    })
}

export const setUserToken = token => {
    localStorage.setItem('userToken', token)
    return dispatch => {
        resetError(dispatch)
        dispatch({
            type: 'SET_TOKEN',
            payload: token
        })
        apiGetUser(token)
            .then(user => setUserData(dispatch, user))
    }
}

// addresses
export const updateAddress = (token, address, idAddress) => {
    return dispatch => {
        apiUpdateAddress(token, address, idAddress)
            .then(data => {
                setAddresses(token)(dispatch)
            })
    }
}

export const deleteAddress = (token, idAddress) => {
    return dispatch => {
        apiDeleteAddress(token, idAddress)
            .then(() => setAddresses(token)(dispatch))
    }
}

export const setAddresses = token => {
    return dispatch => {
        setLoading(dispatch, 'addresses')
        apiGetAddresses(token)
            .then(data => dispatch({
                type:'SET_ADDRESSES',
                payload: data})
            )
    }
}