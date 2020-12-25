import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { getAllProducts } from '../../services/redux/actions/vendor/product'

import { Button, Col, Input, Row, Space, Table } from 'antd'
import { EditOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { updateFilters, resetFilters } from '../../services/redux/actions/global'
import Column from 'antd/lib/table/Column'
import ColumnGroup from 'antd/lib/table/ColumnGroup'
import { setCategories } from '../../services/redux/actions/vendor/category'


const ProductListVendor = props => {

    const categoryFilters = []
    const userToken = localStorage.getItem('userToken')
    if (!userToken && (props.user.user.role !== 'vendor')) {
        return <Redirect to='/user' />
    }

    if (!props.products.loading && props.products.idCategory !== 'vendor') {
        setTimeout(() => props.getAllProducts('vendor'), 1)
    }

    if (!props.categories.loading && !props.categories.loaded) {
        props.getAllCategories()
    }

    if (props.categories.loaded) {
        props.categories.list.map(c => (
            categoryFilters.push({
                text: c.name,
                value: c._id
            })
        ))
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        props.updateFilters({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        })
    }

    const handleReset = clearFilters => {
        clearFilters();
        props.resetFilters({ searchText: '' })
    }

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={'Filtrar'}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        key='buscar'
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Buscar
                    </Button>
                    <Button
                        key='reset'
                        onClick={() => handleReset(clearFilters)}
                        size="small" style={{ width: 90 }}
                    >
                        Reiniciar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined key='filter' style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    })

    return (
        <Row gutter={[36, 36]} justify='center'>
            <Col span={24} className='text-right'>
                <Button type='primary'>
                    <Link to='/user/products/add'><PlusOutlined /> Añadir Producto</Link>
                </Button>
            </Col>
            <Col span={24}>
                <Table
                    loading={(props.products.loading || props.categories.loading) ? true : false}
                    dataSource={props.products.list}
                    rowKey={(item) => item._id}
                >
                    <ColumnGroup
                        key='information'
                        title='Información'
                    >
                        <Column
                            title='Nombre'
                            dataIndex='name'
                            key='name'
                            {...getColumnSearchProps('name')}
                            sorter={(a, b) => a.name.localeCompare(b.name)}

                        />
                        <Column
                            title='Categoría'
                            dataIndex='category'
                            key='category'
                            filters={categoryFilters}
                            onFilter={(value, record) => record.category.indexOf(value) === 0}
                            sorter={(a, b) => {
                                if (props.categories.loaded) {
                                    const categoryA = props.categories.list.filter(v => v._id === a.category)[0].name
                                    const categoryB = props.categories.list.filter(v => v._id === b.category)[0].name
                                    return categoryA.localeCompare(categoryB)
                                }
                                return false
                            }}
                            render={(text, record) => props.categories.loaded ? props.categories.list.filter(v => v._id === text)[0].name : '--'}
                        />
                    </ColumnGroup>
                    <ColumnGroup
                        title='Precios'
                        key='prices'
                    >
                        <Column
                            title='Precio Final'
                            dataIndex='finalPrice'
                            key='finalPrice'
                            {...getColumnSearchProps('finalPrice')}
                            sorter={(a, b) => a.finalPrice - b.finalPrice}
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => text + ' ' + record.symbol}
                        />
                        <Column
                            title='Precio Original'
                            dataIndex='price'
                            key='price'
                            {...getColumnSearchProps('price')}
                            sorter={(a, b) => a.price - b.price}
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => text + ' ' + record.symbol}
                        />
                        <Column
                            title='Descuento'
                            dataIndex='discount'
                            key='discount'
                            {...getColumnSearchProps('discount')}
                            sorter={(a, b) => a.discount - b.discount}
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => text + ' ' + (record.discountType === 'amount' ? record.symbol : '%')}
                        />
                        <Column
                            title='Cantidad'
                            dataIndex='quantity'
                            key='quantity'
                            {...getColumnSearchProps('quantity')}
                            sorter={(a, b) => a.quantity - b.quantity}
                            sortDirections={['descend', 'ascend']}
                        />
                    </ColumnGroup>
                    <Column
                        title='Editar'
                        dataIndex='edit'
                        key='edit'
                        render={(text, record) => <Link to={'/user/products/' + record._id}><EditOutlined /></Link>}
                    />
                </Table>
            </Col>
        </Row>
    )
}

const mapStateToProps = state => ({
    products: state.products,
    user: state.user,
    categories: state.categories,
})

const mapDispatchToProps = dispatch => ({
    getAllProducts: (pagination, id) => getAllProducts(pagination, id)(dispatch),
    getAllCategories: () => setCategories()(dispatch),
    updateFilters: (filter) => updateFilters(dispatch, filter),
    resetFilters: (filter) => resetFilters(dispatch, filter),
})


const connected = connect(mapStateToProps, mapDispatchToProps)(ProductListVendor)

export default connected