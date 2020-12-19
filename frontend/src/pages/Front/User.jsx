import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LogoutButton from '../../components/Button/LogoutButton'

import { Row, Col } from 'antd'

const User = props => {

    if (!props.user.token) {
        return <Redirect to='/login' />
    }

    const user = props.user.user

    return (
        <Row gutter={[36, 36]} style={{ padding: '2eM' }}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            </Col>
            <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                <h1>Usuario</h1>
                <li>{user.user}</li>
                <li>{user.email}</li>
                <li>{user.role}</li>
                <LogoutButton />
            </Col>
        </Row>
    )

}

const mapStateToProps = state => ({
    user: state.user
})

const connected = connect(mapStateToProps)(User)

export default connected