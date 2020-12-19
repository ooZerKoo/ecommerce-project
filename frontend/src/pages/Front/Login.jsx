import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginForm from '../../components/Forms/LoginForm'


const Login = props => {
    
    if (props.user.token) {
        return <Redirect to='/user' />
    }

    return <LoginForm />

}

const mapStateToProps = state => ({
    user: state.user
})

const connected = connect(mapStateToProps)(Login)

export default connected