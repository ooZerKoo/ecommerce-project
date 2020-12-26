import React from 'react'
import { connect } from 'react-redux'

import './Form.scss'
import { Form, Input, Button } from 'antd'

import { SaveOutlined, DeleteOutlined } from '@ant-design/icons'
import { Redirect } from 'react-router-dom'
import { deleteAddress, updateAddress } from '../../services/redux/actions/user'


const AddressForm = props => {

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
        className: 'login',
    };

    const userToken = localStorage.getItem('userToken')
    if (!userToken) {
        return <Redirect to='/login' />
    }

    return (
        <Form
            {...layout}
            onFinish={data => props.updateAddress(userToken, data, props.idAddress)}
            initialValues={props.address}
        >
            <Form.Item
                key='name'
                name='name'
                label='Contacto de entrega'
                rules={[
                    {
                        required: true,
                        message: 'El contacto es necesario'
                    },
                    {
                        whitespace: true,
                        message: 'El contacto es necesario'
                    }
                ]}
            >
                <Input size="large" />
            </Form.Item>
            <Form.Item
                key='address'
                name='address'
                label='Dirección Completa'
                rules={[
                    {
                        required: true,
                        message: 'La dirección es necesaria'
                    },
                    {
                        whitespace: true,
                        message: 'La dirección es necesaria'
                    }
                ]}
            >
                <Input size="large" />
            </Form.Item>
            <Form.Item
                key='postalCode'
                name='postalCode'
                label='Código Postal'
                rules={[
                    {
                        required: true,
                        message: 'El Código Postal es necesario'
                    },
                    {
                        whitespace: true,
                        message: 'El Código Postal es necesario'
                    }
                ]}
            >
                <Input size="large" />
            </Form.Item>
            <Form.Item
                key='phone'
                name='phone'
                label='Teléfono de Contacto'
                rules={[
                    {
                        required: true,
                        message: 'El Teléfono de contacto es necesario'
                    },
                    {
                        whitespace: true,
                        message: 'El Teléfono de contacto es necesario'
                    }
                ]}
            >
                <Input size="large" />
            </Form.Item>
            <Form.Item
                key='poblation'
                name='poblation'
                label='Población'
                rules={[
                    {
                        required: true,
                        message: 'La población es necesaria'
                    },
                    {
                        whitespace: true,
                        message: 'La población es necesaria'
                    }
                ]}
            >
                <Input size="large" />
            </Form.Item>
            <Form.Item
                key='state'
                name='state'
                label='Província'
                rules={[
                    {
                        required: true,
                        message: 'La Província es necesaria'
                    },
                    {
                        whitespace: true,
                        message: 'La Província es necesaria'
                    }
                ]}
            >
                <Input size="large" />
            </Form.Item>

            <Form.Item wrapperCol={24}>
                <Button type="primary" block size="large" htmlType="submit"><SaveOutlined /> {props.idAddress ? 'Guardar Dirección' : 'Añadir Dirección'}</Button>
                {props.idAddress && <Button type='dashed' block size="large" onClick={() => props.deleteAddress(userToken, props.idAddress)}><DeleteOutlined /> Eliminar Dirección</Button>}
            </Form.Item>
        </Form>
    )
}

const mapStateToProps = (state, extra) => ({
    address: extra.address,
    idAddress: extra.idAddress,
})

const mapDispatchToProps = (dispatch) => ({
    updateAddress: (token, address, idAddress) => updateAddress(token, address, idAddress)(dispatch),
    deleteAddress: (token, idAddress) => deleteAddress(token, idAddress)(dispatch),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddressForm)

export default connected