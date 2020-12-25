import axios from 'axios'

const protocol = process.env.REACT_APP_API_PROTOCOL || 'http://'
const base = protocol + process.env.REACT_APP_API_URL + process.env.REACT_APP_VENDOR_ROUTE + process.env.REACT_APP_CATEGORY_ROUTE

export const apiGetCategories = async () => {
    try {
        const url = base
        const r = await axios.get(url)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetCategoryById = async (idCategory) => {
    try {
        const url = base
        const r = await axios.get(url + '/' + idCategory)
        return r.data
    } catch (error) {
        console.error(error)
    }
}

export const apiUpdateCategory = async (idCategory, category) => {
    try {
        if (idCategory === 'add') {
            return apiAddCategory(category)
        }
        const url = base + '/' + idCategory
        const r = await axios.post(url, {...category})
        return r
    } catch (error) {
        console.error(error)
    } 
}

export const apiAddCategory = async (category) => {
    try {
        const url = base
        const r = await axios.post(url, {...category})
        return r
    } catch (error) {
        console.error(error)
    } 
}