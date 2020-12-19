import axios from 'axios'

const protocol = process.env.REACT_APP_API_PROTOCOL || 'http://'
const base = protocol + process.env.REACT_APP_API_URL

export const apiGetProductsCategory = async (id, pagination = {}) => {
    try {
        const url = base + '/category/' + id + '/products'
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

export const apiGetProductByUrl = async (urlProduct, pagination = {}) => {
    try {
        const url = base + '/products/url/' + urlProduct
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

export const apiGetProductById = async (idProduct, pagination = {}) => {
    try {
        const url = base + '/products/id/' + idProduct
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