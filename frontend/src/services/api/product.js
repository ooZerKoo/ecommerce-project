import axios from 'axios'

const protocol = process.env.REACT_APP_API_PROTOCOL || 'http://'
const base = protocol + process.env.REACT_APP_API_URL + process.env.REACT_APP_PRODUCT_ROUTE

delete axios.defaults.headers.common["Authorization"]

export const apiGetProductByUrl = async (urlProduct, pagination = {}) => {
    try {
        const url = base + '/url/' + urlProduct
        const r = await axios.get(url,{
            params: {
                ...pagination
            }
        })
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetAllProducts = async (pagination = {}) => {
    try {
        const url = base
        const r = await axios.get(url,{
            params: {
                ...pagination
            }
        })
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetTotalAllProducts = async () => {
    try {
        const url = base + '/total'
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetProductById = async (idProduct) => {
    try {
        const url = base + '/id/' + idProduct
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiUpdateProduct = async (idProduct, product) => {
    try {
        const url = base + idProduct
        const r = await axios.post(url, {...product})
        return r
    } catch (error) {
        console.error(error)
    } 
}