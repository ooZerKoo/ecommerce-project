import axios from 'axios'

const protocol = process.env.REACT_APP_API_PROTOCOL || 'http://'
const base = protocol + process.env.REACT_APP_API_URL

export const apiSetLogin = async (user, password) => {
    try {
        const url = base + '/user/login'
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
        const url = base + '/user'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiSetRegister = async (user, email, password, password2) => {
    try {
        const url = base + '/user/login'
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