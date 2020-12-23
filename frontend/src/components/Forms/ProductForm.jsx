import React from 'react'
import { connect } from 'react-redux'

import './Form.scss'
import { Form, Select, Row, Col, Input, Button, InputNumber } from 'antd'
import { updateProduct } from '../../services/redux/actions/vendor/product'
import { setCategories } from '../../services/redux/actions/vendor/category'
import UploadImages from './UploadImages'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { SaveOutlined } from '@ant-design/icons'

const { Option } = Select;


const ProductForm = props => {

    if (!props.categories.loading && !props.categories.loaded) {
        props.setCategories()
    }

    if (props.product.loaded && props.product._id === props.idProduct) {
        return (
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                className='login'
                initialValues={props.product}
                onFinish={data => props.updateProduct(props.idProduct, data)}
            >
                <Row gutter={36} justify="center">
                    <Col span={8}>
                        <h3>Imágenes</h3>
                        <UploadImages idProduct={props.idProduct} />
                    </Col>

                    <Col span={16}>
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
                            <ReactQuill theme="snow" value={props.product.description} onChange={() => null}/>
                        </Form.Item>
                        <Form.Item key='url' label='Enlace Amigable' name='url'
                            rules={[
                                { required: true, message: 'El enlace amigable es obligatorio' },
                                { whitespace: true, message: 'No puede estar vacío' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item key='quantity' name='quantity' label='Cantidad'>
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={36} justify="center">
                    <Col span={8}></Col>
                    <Col span={16}>
                        <h3>Precios</h3>
                        <Form.Item key='price' label='Precio'>
                            <Input.Group compact>
                                <Form.Item name='price'>
                                    <InputNumber min={0} />
                                </Form.Item>
                                <Form.Item name='symbol' style={{ width: '20%' }}>
                                    <Input
                                        rules={[
                                            { required: true, message: 'La moneda es obligatoria' },
                                            { whitespace: true, message: 'No puede estar vacío' }
                                        ]}
                                    />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>

                        <Form.Item key='discount' label='Descuento'>
                            <Input.Group compact>
                                <Form.Item name='discount'>
                                    <InputNumber min={0} />
                                </Form.Item>
                                <Form.Item name='discountType' style={{ width: '20%' }}>
                                    <Select>
                                        <Option value='percent'>%</Option>
                                        <Option value='amount'>€</Option>
                                    </Select>
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={36} justify='center'>
                    <Col span={8}></Col>
                    <Col span={16}>
                        <h3>Asignaciones</h3>
                        <Form.Item key='category' name='category' label='Categoría'>
                            <Select>
                                {props.categories.list.map(i => <Option key={i._id} value={i._id}>{i.name}</Option>)}
                            </Select>
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
    product: state.product,
    idProduct: extra.idProduct,
    categories: state.categories,
})

const mapDispatchToProps = (dispatch) => ({
    setCategories: () => setCategories()(dispatch),
    updateProduct: (idProduct, product) => updateProduct(idProduct, product)(dispatch)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductForm)

export default connected