import { combineReducers } from 'redux'

const initialStateMenu = {
    loaded: false,
    loading: false,
    items: [],
}
const menu = (state = initialStateMenu, action) => {
    switch (action.type) {
        case 'SET_MENU':
            return {
                items: [
                    ...action.payload
                ],
                loading: false,
                loaded: true,
            }

        case 'SET_MENU_LOADING':
            return {
                ...state,
                loading: true,
                loaded: false,
            }

        case 'RESET':
            return initialStateMenu

        default:
            return state
    }
}

const initialStateCategories = {
    loaded: false,
    loading: false,
    list: [],
}

const categories = (state = initialStateCategories, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return {
                list: [
                    ...action.payload
                ],
                loading: false,
                loaded: true,
            }

        case 'SET_CATEGORIES_LOADING':
            return {
                ...state,
                loading: true,
                loaded: false,
            }

        case 'RESET_CATEGORIES':
            return initialStateMenu

        default:
            return state
    }
}

const initialBreadCrumb = {
    loading: false,
    list: [
        {
            url: '/',
            name: 'Inicio'
        },
        {
            url: '/user',
            name: 'Tu Cuenta',
        },
        {
            url: '/products',
            name: 'Productos',
        },
        {
            url: '/categories',
            name: 'Categorías',
        },
        {
            url: '/orders',
            name: 'Pedidos',
        },
        {
            url: '/add',
            name: 'Añadir',
        },
        {
            url: '/customers',
            name: 'Clientes',
        },
    ]
}

const breadcrumb = (state = initialBreadCrumb, action) => {
    var newData, newState
    switch (action.type) {
        case 'SET_BREADCRUMB':
            newData = {
                url: '/'+action.payload.url,
                name: action.payload.name
            }
            newState = {
                ...state,
                loading: false,
            }
            newState.list.push(newData)
            return newState

        default:
            return state
    }
}

const initialCateogry = {
    loading: false,
    loaded: false,
    url: null,
    _id: null,
}

const category = (state = initialCateogry, action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return {
                loading: false,
                loaded: true,
                ...action.payload
            }
        case 'SET_CATEGORY_LOADING':
            return {
                ...initialCateogry,
                loaded: false,
                loading: true,
            }
        
        default:
            return state
    }
}

const initialProduct = {
    loading: false,
    loaded: false,
    url: null,
    _id: null,
}

const product = (state = initialProduct, action) => {
    switch (action.type) {
        case 'SET_PRODUCT':
            return {
                loading: false,
                loaded: true,
                ...action.payload
            }
        case 'SET_PRODUCT_LOADING':
            return {
                ...initialProduct,
                loaded: false,
                loading: true,
            }

        case 'SET_PRODUCT_LOADED':
            return {
                ...state,
                loaded: true,
                loading: false,
            }

        case 'SET_PRODUCT_IMAGES':
            return {
                ...state,
                images: action.payload
            }
        
        default:
            return state
    }
}

const initialProducts = {
    loading: false,
    loaded: false,
    list: [],
    idCategory: null,
    page: 0,
    limit: 12,
}

const products = (state = initialProducts, action) => {
    switch (action.type) {
        case 'RESET_PRODUCTS':
            return initialProducts

        case 'SET_PRODUCTS':
            return {
                loading: false,
                loaded: true,
                ...action.payload
            }

        case 'UPDATE_PRODUCTS':
            const newState = state.list
            const product = action.payload
            const returnState = newState.filter(v => v._id !== product._id)
            returnState.push(product)
            return {
                loading: false,
                loaded: true,
                list: newState,
            }
        
        case 'SET_PRODUCTS_LOADING':
            return {
                ...state,
                loaded: false,
                loading: true,
            }
        
        default:
            return state
    }
}

const initialStateCart = {
    loaded: false,
    open: false,
    loading: false,
    total: 0,
    quantity: 0,
    products: [],
    token: null,
}
const cart = (state = initialStateCart, action) => {
    switch (action.type) {
        case 'SET_CART_LOADING':
            return {
                ...state,
                loading: true,
                loaded: false
            }

        case 'SET_CART':
            return {
                ...state,
                loading: false,
                loaded: true,
                ...action.payload
            }

        case 'TOGGLE_CART':
            return {
                ...state,
                open: !state.open
            }

        case 'OPEN_CART':
            return {
                ...state,
                open: true
            }

        default:
            return state
    }
}

const initialButton = []
const button = (state = initialButton, action) => {
    const newState = state
    const idProduct = action.payload
    const finalButtons = state.filter(v => v.idProduct !== idProduct)
    const tempButtons = state.filter(v => v.idProduct === idProduct)
    switch (action.type) {
        case 'SET_BUTTON':
            newState.push(action.payload)
            return newState

        case 'SET_BUTTON_LOADING':
            if (tempButtons.length > 0) {
                tempButtons[0].loading = true
                finalButtons.push(tempButtons[0])
            } else {
                finalButtons.push({
                    idProduct:idProduct,
                    loading: true
                })
            }
            return finalButtons

        case 'SET_BUTTON_LOADED':
            if (tempButtons.length > 0) {
                tempButtons[0].loading = false
                finalButtons.push(tempButtons[0])
            } else {
                finalButtons.push({
                    idProduct:idProduct,
                    loading: false
                })
            }
            return finalButtons

        default:
            return state
    }
}


const initialUser = {
    loading: false,
    loaded: false,
    token: null,
    user: {}
}
const user = (state = initialUser, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return {
                loading: false,
                loaded: true,
                ...action.payload
            }

        case 'SET_LOGOUT':
            return initialUser

        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }

        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            }

        case 'SET_USER_LOADING':
            return {
                ...state,
                loaded: false,
                loading: true
            }

        case 'SET_USER_LOADED':
            return {
                ...state,
                loaded: true,
                loading: false
            }

        default:
            return state
    }
}

const initialError = ''
const error = (state = initialError, action) => {
    switch (action.type) {
        case 'ADD_ERROR':
            return action.payload

        case 'RESET_ERROR_MESSAGES':
            return initialError

        default:
            return state
    }
}

const initialPagination = {
    total: 0,
    page: 1,
    limit: 12,
}

const pagination = (state = initialPagination, action) => {
    switch (action.type) {
        case 'SET_PAGE_PAGINATION':
            return {
                ...state,
                page: action.payload
            }

        case 'SET_LIMIT_PAGINATION':
            return {
                ...state,
                limit: action.payload
            }

        case 'SET_TOTAL_PAGINATION':
            return {
                ...state,
                total: action.payload
            }

        case 'RESET_PAGINATION':
            return initialPagination

        default:
            return state
    }
}

const initialFilters = {
    filter: null,
    sort: null,
}

const filters = (state = initialFilters, action) => {
    switch (action.type) {
        case 'SET_FILTER_FILTERS':
            return {
                ...state,
                filter: action.payload
            }
        case 'SET_SORT_FILTERS':
            return {
                ...state,
                sort: action.payload
            }
        
        case 'RESET_FILTER_FILTERS':
            return {
                ...state,
                filter: null
            }
        case 'RESET_SORT_FILTERS':
            return {
                ...state,
                sort: null
            }

        case 'RESET_ALL_FILTERS':
            return initialFilters
        
        default:
            return state
    }
}


const reducer = combineReducers({
    button,
    menu,
    cart,
    category,
    categories,
    product,
    products,
    user,
    error,
    pagination,
    filters,
    breadcrumb,
});

export default reducer