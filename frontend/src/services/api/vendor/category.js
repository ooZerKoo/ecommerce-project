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