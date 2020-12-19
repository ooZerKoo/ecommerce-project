import axios from 'axios'

const protocol = process.env.REACT_APP_API_PROTOCOL || 'http://'
const base = protocol + process.env.REACT_APP_API_URL


export const apiGetCategories = async () => {
    try {
        const url = base + '/category'
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetCategoryByUrl = async (data) => {
    try {
        const url = base + '/category/url/' + data
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetTotalProductsCategory = async (id) => {
    try {
        const url = base + '/category/' + id + '/total'
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}