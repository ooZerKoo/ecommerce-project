import React from 'react'
import { connect } from 'react-redux'

import { setLogin } from '../../services/redux/actions/user'

import { Form, Button, Row, Col, Input, Divider } from 'antd'
import { NavLink } from 'react-router-dom'

import './Form.scss'

const LoginForm = props => {

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
            id: 'password',
            name: 'Contraseña',
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
            <Col xs={24} sm={24} md={16} lg={12} xl={8} xxl={6}>
                <Form {...layout} onFinish={data => props.setLogin(data.user, data.password)}>
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
                        <Button type="primary" block size="large" htmlType="submit">Iniciar Sesión</Button>
                    </Form.Item>

                    <Divider orientation="left">ó bien</Divider>
                    <NavLink to='/register'><Button block size="large" type="default">Regístrate</Button></NavLink>
                </Form>
            </Col>
        </Row>
    )
}


const mapDispatchToProps = (dispatch) => ({
    setLogin: (user, password) => setLogin(user, password)(dispatch)
})

const connected = connect(
    null,
    mapDispatchToProps
)(LoginForm)

export default connected