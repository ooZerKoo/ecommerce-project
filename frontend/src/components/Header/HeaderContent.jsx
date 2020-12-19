import React from 'react'
import { connect } from 'react-redux'

import { Layout, Menu, Badge } from 'antd';
import { UserOutlined, ShoppingCartOutlined, HomeOutlined } from '@ant-design/icons';

import { toggleCart } from '../../services/redux/actions/cart'
import { NavLink } from 'react-router-dom';

import BreadCrumbContent from '../BreadCrumb/BreadCrumbContent'
import MenuVendor from '../Vendor/MenuVendor'

import './HeaderContent.scss'

const { Header } = Layout;
const { SubMenu } = Menu;

const HeaderContent = props => {

    const userToken = props.user.token
    const user = props.user.user

    const style = {
        fontSize: '1.3eM'
    }
    const renderMenu = () => {
        const menu = [
            {
                key: 'home',
                icon: <HomeOutlined style={style} />,
                class: 'float-left',
                logged: true,
                noLogged: true,
                url: '/',
            },
            ...props.menu.items,
            {
                key: 'cart',
                icon: <Badge count={props.cart.quantity} style={{ marginRight: '0.8eM', transform: 'scale(0.8) translate(50%, -50%)' }} ><ShoppingCartOutlined style={style} /></Badge>,
                class: 'float-right',
                logged: true,
                noLogged: true,
                onclick: () => props.toggleCart()
            },
            {
                key: 'login',
                icon: <UserOutlined style={style} />,
                class: 'float-right',
                logged: false,
                noLogged: true,
                url: '/login'
            },
            {
                key: 'user',
                icon: <UserOutlined style={style} />,
                class: 'float-right',
                logged: true,
                noLogged: false,
                url: '/user',
            }
        ]

        return menu.map(item => getMenuItem(item));
    }

    const getMenuItem = (item) => {
        if ((item.logged && userToken) || (item.noLogged && !userToken)) {
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
        <React.Fragment>
            <Header>
                <Menu mode="horizontal" className="text-center">
                    {renderMenu()}
                </Menu>
            </Header>
            {(user.role && (user.role === 'vendor' || user.role === 'admin')) && <MenuVendor />}
            <BreadCrumbContent />
        </React.Fragment>
    )
}

const mapSateToProps = state => ({
    menu: state.menu,
    user: state.user,
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    toggleCart: () => toggleCart(dispatch)
})

const connected = connect(mapSateToProps, mapDispatchToProps)(HeaderContent)

export default connected