const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    password: {
        type: String,
        required: [true, 'Email necesario'],
    },
    email: {
        type: String,
        required: [true, 'Email necesario'],
        unique: [true, 'Este email ya está registrado'],
    },
    user: {
        type: String,
        required: [true, 'Usuario necesario'],
        unique: [true, 'Este usuario ya está cogido'],
    },
    name: String,
    birthday: Date,
    role: {
        type: String,
        default: 'customer',
        enum: ['customer', 'employee', 'admin', 'editor']
    },
    cart: Array,
    token: String,
    address: [String]
}, {
    toJSON: {
        transform: function (req, res) {
            delete res.password
            return res
        }
    }
})

UserSchema.pre("save", async function (next) {
    try {
        passwordHash = await getPassword(this.password)
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
})

UserSchema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({
                _id: this._id,
                role: this.role,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
            },
            process.env.KEY
        )
        await this.updateOne({
            token: token
        })

        return token
    } catch (error) {
        console.error(error)
    }
}

UserSchema.methods.removeAuthToken = async function () {
    try {
        const user = await this.updateOne({
            token: null
        })
        return user
    } catch (error) {
        console.error(error)
    }
}

UserSchema.methods.login = function (req, res, next) {
    req.session.user = {
        _id: this._id,
        role: this.role
    }
    const cart = req.session.cart
    const userCart = this.cart
    if (cart.length > 0) {
        for (c in cart) {
            userCart.push(cart[c])
        }
    }
    req.session.cart = userCart
    next()
}

UserSchema.methods.updatePassword = async function (password) {
    const passwordHash = await getPassword(password)
    return await User.findByIdAndUpdate(
        this._id, {
            password: passwordHash
        }, {
            new: true
        }
    )
}

UserSchema.methods.checkPassword = async function (password) {
    try {
        const check = await bcrypt.compare(password, this.password)
        return check
    } catch (error) {
        console.error(error)
    }
}

const getPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        const passwordHash = await bcrypt.hash(password, salt);
        return passwordHash
    } catch (error) {
        console.error(error)
    }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;