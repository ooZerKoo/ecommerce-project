import React from 'react'
import { connect } from 'react-redux'

import { Button } from 'antd';

import { setButton, setLoading } from '../../services/redux/actions/global'
import { LogoutOutlined } from '@ant-design/icons';
import { setLogout } from '../../services/redux/actions/user';

const LogoutButton = props => {
    var button = props.button.filter(v => v.idProduct === 'logout')
    if (button) {
        button = button[0]
    } else {
        props.setButton('logout')
    }

    return (
        <Button
            type="primary"
            icon={<LogoutOutlined />}
            loading={button ? button.loading : false}
            onClick={() => props.setLogout()}
        >
            Cerrar Sesión
        </Button>
    )
}

const mapSateToProps = (state, extra) => ({
    button: state.button
})

const mapDispatchToProps = dispatch => ({
    setButton: () => setButton(dispatch, 'logout'),
    setLoading: () => setLoading(dispatch, 'button', 'logout'),
    setLogout: () => setLogout(dispatch)
})

const connected = connect(mapSateToProps, mapDispatchToProps)(LogoutButton)

export default connected