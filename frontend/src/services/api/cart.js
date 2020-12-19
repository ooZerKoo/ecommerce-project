import axios from 'axios'

const protocol = process.env.REACT_APP_API_PROTOCOL || 'http://'
const base = protocol + process.env.REACT_APP_API_URL

export const apiGetCart = async (token) => {
    try {
        const url = base + '/cart'
        const r = await axios.post(url, {
            cartToken: token
        })
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiAddToCart = async (token, idProduct, quantity) => {
    try {
        const url = base + '/cart/add'
        const r = await axios.post(url, {
            cartToken: token,
            id: idProduct,
            quantity: quantity
        })
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiRemoveProductCart = async (token, idProduct) => {
    try {
        const url = base + '/cart/' + idProduct
        const r = await axios.put(url, {
            cartToken: token
        })
        return r.data
    } catch (error) {
        console.error(error)
    }
}