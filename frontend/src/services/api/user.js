import axios from 'axios'

const protocol = process.env.REACT_APP_API_PROTOCOL || 'http://'
const base = protocol + process.env.REACT_APP_API_URL + process.env.REACT_APP_USER_ROUTE

export const apiSetLogin = async (user, password) => {
    try {
        const url = base + '/login'
        delete axios.defaults.headers.common["Authorization"]
        const r = await axios.post(url, {
            user,
            password,
        })
        return r
    } catch (error) {
        console.error(error)
    }
}

export const apiGetUser = async (token) => {
    try {
        const url = base
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiSetRegister = async (user, email, password, password2) => {
    try {
        const url = base + '/login'
        delete axios.defaults.headers.common["Authorization"]
        const r = await axios.post(url, {
            user,
            email,
            password,
            password2
        })
        return r
    } catch (error) {
        console.error(error)
    }
}

export const apiUpdateAddress = async (token, address, idAddress = null) => {
    try {
        if (!idAddress) {
            return apiAddAddress(token, address)
        }
        const url = base + '/address/' + idAddress
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        const r = await axios.put(url, {...address})
        return r
    } catch (error) {
        console.error(error)
    }
}

export const apiAddAddress = async (token, address) => {
    try {
        const url = base + '/address'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        const r = await axios.post(url, { ...address })
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiDeleteAddress = async (token, idAddress) => {
    try {
        const url = base + '/address/' + idAddress
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        const r = await axios.delete(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetAddresses = async (token) => {
    try {
        const url = base + '/address'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetAddress = async (token, idAddress) => {
    try {
        const url = base + '/address/' + idAddress
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}