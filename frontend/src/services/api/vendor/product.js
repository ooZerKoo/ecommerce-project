import axios from 'axios'

const protocol = process.env.REACT_APP_API_PROTOCOL || 'http://'
const base = protocol + process.env.REACT_APP_API_URL + process.env.REACT_APP_VENDOR_ROUTE + process.env.REACT_APP_PRODUCT_ROUTE

export const apiGetAllProducts = async () => {
    try {
        const url = base
        const r = await axios.get(url)
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

export const apiDeleteProduct = async (idProduct, product) => {
    try {
        const url = base + '/' + idProduct
        const r = await axios.delete(url)
        return r
    } catch (error) {
        console.error(error)
    } 
}

export const apiUpdateProduct = async (idProduct, product) => {
    try {
        if (idProduct === 'add') {
            return apiAddProduct(product)
        }
        const url = base + '/' + idProduct
        const r = await axios.post(url, {...product})
        return r
    } catch (error) {
        console.error(error)
    } 
}

export const apiAddProduct = async (product) => {
    try {
        const url = base
        const r = await axios.post(url, {...product})
        return r
    } catch (error) {
        console.error(error)
    } 
}

export const apiDeleteImageProduct = async (idProduct, img) => {
    try {
        const url = base + '/img/' + idProduct
        const r = await axios.delete(url, {
            params: { img }
        }) 
        return r
    } catch (error) {
        console.error(error)
    }
}