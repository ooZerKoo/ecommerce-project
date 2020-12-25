import React from 'react'
import { connect } from 'react-redux'

import './Form.scss'
import { Form, Row, Col, Input, Button } from 'antd'
import { updateCategory } from '../../services/redux/actions/vendor/category'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { SaveOutlined } from '@ant-design/icons'

const CategoryForm = props => {

    if (props.category.loaded && props.category._id === props.idCategory) {
        return (
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                className='login'
                initialValues={props.category}
                onFinish={data => props.updateCategory(props.idCategory, data)}
            >
                <Row gutter={36} justify="center">
                    <Col span={24}>
                        <h3>Información</h3>
                        <Form.Item key='name' label='Nombre' name='name'
                            rules={[
                                { required: true, message: 'El nombre es obligatorio' },
                                { whitespace: true, message: 'No puede estar vacío' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item key='description' label='Descripción' name='description'>
                            <ReactQuill theme="snow" value={props.category.description} onChange={() => null}/>
                        </Form.Item>
                        <Form.Item key='url' label='Enlace Amigable' name='url'
                            rules={[
                                { required: true, message: 'El enlace amigable es obligatorio' },
                                { whitespace: true, message: 'No puede estar vacío' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item wrapperCol={24}>
                    <Button type="primary" size="large" className='float-right' htmlType="submit"><SaveOutlined /> Guardar</Button>
                </Form.Item>
            </Form>
        )
    }
    return null
}

const mapStateToProps = (state, extra) => ({
    idCategory: extra.idCategory,
    category: state.category,
})

const mapDispatchToProps = (dispatch) => ({
    updateCategory: (idProduct, product) => updateCategory(idProduct, product)(dispatch)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryForm)

export default connected