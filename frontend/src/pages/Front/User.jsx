import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LogoutButton from '../../components/Button/LogoutButton'
import AddressForm from '../../components/Forms/AddressForm'

import { Row, Col } from 'antd'
import { setAddresses } from '../../services/redux/actions/user'

const User = props => {

    const userToken = localStorage.getItem('userToken')
    if (!userToken) {
        return <Redirect to='/login' />
    }
    const user = props.user.user

    if (!props.addresses.loading && !props.addresses.loaded) {
        props.setAddresses(userToken)
    }

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
            <Col xs={24}>
                <h1>Direcciones</h1>
                <Row gutter={[36, 36]} style={{ padding: '2eM' }}>
                    {props.addresses.list.map(i => (
                        i && <Col key={i._id} xs={24} sm={24} md={12}>
                            <AddressForm address={i} idAddress={i._id} />
                        </Col>
                    ))}
                    <Col key='add_address' xs={24} sm={24} md={12}>
                        <AddressForm address={{}} idAddress={null} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )

}

const mapStateToProps = state => ({
    user: state.user,
    addresses: state.addresses
})

const mapDispatchToProps = (dispatch) => ({
    setAddresses: (token) => setAddresses(token)(dispatch)
})

const connected = connect(mapStateToProps, mapDispatchToProps)(User)

export default connected