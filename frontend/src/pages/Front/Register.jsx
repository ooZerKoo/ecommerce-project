import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import RegisterForm from '../../components/Forms/RegisterForm'


const Register = props => {
    if (props.user.token) {
        return <Redirect to='/user' />
    }
    return <RegisterForm />
}

const mapStateToProps = state => ({
    user: state.user
})

const connected = connect(mapStateToProps)(Register)

export default connected