import React from 'react'
import { connect } from 'react-redux'

import { setRegister } from '../../services/redux/actions/user'

import { Form, Button, Row, Col, Input, Divider } from 'antd'
import { NavLink } from 'react-router-dom'

import './Form.scss'

const RegisterForm = props => {

    const rows = [
        {
            id: 'user',
            name: 'Usuario',
            rules: [
                { required: true, message: 'El usuario es obligatorio' },
                { min: 4, message: 'El usuario tiene que ser de 4 caracteres' },
                { whitespace: true, message: 'No puede estar vacío' },
            ]
        },
        {
            id: 'email',
            name: 'E-mail',
            rules: [
                { required: true, message: 'El email es obligatorio' },
                { pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: 'El formato es incorrecto' },
                { whitespace: true, message: 'No puede estar vacío'},
            ]
        },
        {
            id: 'password',
            name: 'Contraseña',
            type: 'password',
            rules: [
                { required: true, message: 'La contraseña es obligatoria' },
                { min: 4, message: 'La contraseña tiene que ser de 4 caracteres' },
                { whitespace: true, message: 'No puede estar vacío' },
            ]
        },
        {
            id: 'password2',
            name: 'Repite Contraseña',
            type: 'password',
            rules: [
                { required: true, message: 'La contraseña es obligatoria' },
                { min: 4, message: 'La contraseña tiene que ser de 4 caracteres' },
                { whitespace: true, message: 'No puede estar vacío' },
            ]
        },
    ]

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
        className: 'login',
    };

    return (
        <Row justify="center" span={8}>
            <Col xs={24} sm={24} md={16}>
                <Form {...layout} onFinish={data => props.setRegister(data.user, data.email, data.password, data.password2)}>
                    {rows.map(row => (
                        <Form.Item
                            hasFeedback
                            dependencies={row.dependencies}
                            key={row.id}
                            label={row.name}
                            name={row.id}
                            rules={row.rules}>
                            {row.type === 'password' ? <Input.Password size="large" /> : <Input size="large" />}
                        </Form.Item>
                    ))}

                    <Form.Item wrapperCol={24}>
                        <Button type="primary" block size="large" htmlType="submit">Regístrate</Button>
                    </Form.Item>

                    <Divider orientation="left">ó bien</Divider>
                    <NavLink to='/login'><Button block size="large" type="default">Inicia Sesión</Button></NavLink>
                </Form>
            </Col>
        </Row>
    )
}


const mapDispatchToProps = (dispatch) => ({
    setRegister: (user, email, password, password2) => setRegister(user, email, password, password2)(dispatch)
})

const connected = connect(
    null,
    mapDispatchToProps
)(RegisterForm)

export default connected