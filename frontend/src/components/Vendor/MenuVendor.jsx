import React from 'react'
import { connect } from 'react-redux'

import { Layout, Menu } from 'antd';
import { toggleCart } from '../../services/redux/actions/cart'
import { NavLink } from 'react-router-dom';

const { Header } = Layout;
const { SubMenu } = Menu;

const MenuVendor = props => {

    const renderMenu = () => {
        const menu = [
            {
                key: 'products',
                name: 'Productos',
                url: '/user/products',
                role: 'vendor'
            },
            {
                key: 'categories',
                name: 'Categorías',
                url: '/user/categories',
                role: 'vendor'
            },
            {
                key: 'orders',
                name: 'Pedidos',
                url: '/user/orders',
                role: 'vendor'
            },
            {
                key: 'customers',
                name: 'Clientes',
                url: '/user/customers',
                role: 'vendor'
            },
            {
                key: 'configuration',
                name: 'Configuración',
                url: '/user/configuration',
                role: 'admin'
            }
        ]

        return menu.map(item => getMenuItem(item));
    }

    const getMenuItem = (item) => {
        if (item.role === props.role || props.role === 'admin') {
            if (item.submenu) {
                return (
                    <SubMenu className={item.class} key={item.key} title={item.name}>
                        {item.items.map(i => getMenuItem(i))}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item className={item.class} key={item.key} icon={item.icon} onClick={item.onclick}>
                        {item.url ? <NavLink to={item.url} >{item.name}</NavLink> : item.name}
                    </Menu.Item>
                )
            }
        }
    }

    return (
        <Header>
            <Menu mode="horizontal" className="text-center" theme='dark'>
                {renderMenu()}
            </Menu>
        </Header>
    )
}

const mapSateToProps = state => ({
    menu: state.menu,
    role: state.user.user.role,
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    toggleCart: () => toggleCart(dispatch)
})

const connected = connect(mapSateToProps, mapDispatchToProps)(MenuVendor)

export default connected