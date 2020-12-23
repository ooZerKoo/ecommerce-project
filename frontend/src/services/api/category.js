import axios from 'axios'

const protocol = process.env.REACT_APP_API_PROTOCOL || 'http://'
const base = protocol + process.env.REACT_APP_API_URL + process.env.REACT_APP_CATEGORY_ROUTE

delete axios.defaults.headers.common["Authorization"]

export const apiGetCategories = async () => {
    try {
        const url = base
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetCategoryByUrl = async (data) => {
    try {
        const url = base + '/url/' + data
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetTotalProductsCategory = async (id) => {
    try {
        const url = base + '/' + id + '/total'
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetProductsCategory = async (id, pagination = {}) => {
    try {
        const url = base + '/' + id + '/products'
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