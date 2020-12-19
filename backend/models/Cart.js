class Cart {
    constructor(products = [], symbol = '€') {
        this.products = products
        this.symbol = symbol
        this.setTotalCart()
    }

    addProductCart(product, quantity) {
        if (this.products.length > 0) {
            const finalProducts = this.products.filter(v => String(v._id) !== String(product._id))
            const tempProduct = this.products.filter(v => String(v._id) === String(product._id))
            if (tempProduct.length > 0) {
                let finalQuantity = tempProduct[0].quantity + quantity
                if (finalQuantity > 0) {
                    finalProducts.push({
                        ...product,
                        quantity: finalQuantity
                    })
                } else {
                    this.removeProductCart(product)
                }
            } else {
                finalProducts.push({
                    ...product,
                    quantity
                })
            }
            this.products = finalProducts
        } else {
            this.products = [{
                ...product,
                quantity
            }]
        }
        this.setTotalCart()
    }

    removeProductCart(idProduct) {
        const finalProducts = this.products.filter(v => v._id !== idProduct)
        this.products = finalProducts
        this.setTotalCart()
    }

    setTotalCart() {
        var total = 0
        var quantity = 0
        if (this.products.length > 0) {
            for (let i in this.products) {
                total += (this.products[i].finalPrice * this.products[i].quantity)
                quantity += this.products[i].quantity
            }
        }
        this.total = total
        this.quantity = quantity
    }

}

exports.Cart = Cart