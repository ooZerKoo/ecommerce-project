import React from 'react'
import { connect } from 'react-redux'

import { NavLink, useLocation } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'antd';

const BreadCrumbContent = props => {

    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const urls = []
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets[index]}`
        urls.push(url)
        const name = props.breadcrumb.list.filter(v => v.url === url)
        if (name && name.length > 0) {
            return (
                <Breadcrumb.Item key={urls.join('')}>
                    <NavLink to={urls.join('')}>{name[0].name}</NavLink>
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
        return (
            <Row gutter={[16, 16]}>
                <Col span={24} style={{margin: '0.5eM auto'}}>
                    <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                </Col>
            </Row>
        )
    }
}

const mapSateToProps = state => ({
    location: state.location,
    breadcrumb: state.breadcrumb,
})

const connected = connect(mapSateToProps, null)(BreadCrumbContent)

export default connected