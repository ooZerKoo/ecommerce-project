import React from 'react'
import { connect } from 'react-redux'

import { NavLink, useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd';

const BreadCrumbContent = props => {

    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets[index]}`;
        const name = props.breadcrumb.list.filter(v => v.url === url)
        if (name && name.length > 0) {
            return (
                <Breadcrumb.Item key={url}>
                    <NavLink key={url} to={url}>{name[0].name}</NavLink>
                </Breadcrumb.Item>
            );
        } else {
            return ''
        }
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <NavLink key='home' to="/">Home</NavLink>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    if (!props.breadcrumb.loading) {
        return <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    }
}

const mapSateToProps = state => ({
    location: state.location,
    breadcrumb: state.breadcrumb,
})

const connected = connect(mapSateToProps, null)(BreadCrumbContent)

export default connected