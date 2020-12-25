import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import { Button, Col, Input, Row, Space, Table } from 'antd'
import { EditOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { updateFilters, resetFilters } from '../../services/redux/actions/global'
import Column from 'antd/lib/table/Column'
import { setCategories } from '../../services/redux/actions/vendor/category'
import Html from '../../components/Html/Html'


const CategoryListVendor = props => {

    const userToken = localStorage.getItem('userToken')
    if (!userToken && (props.user.user.role !== 'vendor')) {
        return <Redirect to='/user' />
    }

    if (!props.categories.loading && !props.categories.loaded) {
        props.getAllCategories()
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
                    <Link to='/user/categories/add'><PlusOutlined /> Añadir Categoría</Link>
                </Button>
            </Col>
            <Col span={24}>
                <Table
                    loading={props.categories.loading}
                    dataSource={props.categories.list}
                    rowKey={(item) => item._id}
                >
                    <Column
                        title='Nombre'
                        dataIndex='name'
                        key='name'
                        {...getColumnSearchProps('name')}
                        sorter={(a, b) => a.name.localeCompare(b.name)}
                    />
                    <Column
                        title='Enlace Amigable'
                        dataIndex='url'
                        key='url'
                        {...getColumnSearchProps('url')}
                        sorter={(a, b) => a.url.localeCompare(b.url)}
                    />
                    <Column
                        title='Descripción'
                        dataIndex='description'
                        key='description'
                        render={text => <Html html={text} />}
                    />

                    <Column
                        title='Editar'
                        dataIndex='edit'
                        key='edit'
                        render={(text, record) => <Link to={'/user/categories/' + record._id}><EditOutlined /></Link>}
                    />
                </Table>
            </Col>
        </Row>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    categories: state.categories,
})

const mapDispatchToProps = dispatch => ({
    getAllCategories: () => setCategories()(dispatch),
    updateFilters: (filter) => updateFilters(dispatch, filter),
    resetFilters: (filter) => resetFilters(dispatch, filter),
})


const connected = connect(mapStateToProps, mapDispatchToProps)(CategoryListVendor)

export default connected