import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AddressForm from '../../components/Forms/AddressForm'

import { Row, Col, Drawer } from 'antd'
import { setAddresses } from '../../services/redux/actions/user'
import AddressList from '../../components/Address/AddressList'

const User = props => {

    const userToken = localStorage.getItem('userToken')
    if (!userToken) {
        return <Redirect to='/login' />
    }

    if (!props.addresses.loading && !props.addresses.loaded) {
        props.setAddresses(userToken)
    }

    return (
        <Row gutter={[36, 36]} style={{ padding: '2eM' }}>
            <Col xs={24}>
                <h1>¿Dónde quieres enviar?</h1>
                <Row gutter={[36, 36]} style={{ padding: '2eM' }}>
                    {props.addresses.loaded && <AddressList />}
                </Row>
            </Col>
            <Drawer>
                <AddressForm address={{}} idAddress={null} />
            </Drawer>
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