import React from 'react'
import { connect } from 'react-redux'
import { Col, Card } from 'antd'

const { Meta } = Card;

const AddressList = props => {
    console.log(props.addresses.list)
    const renderList = () => {
        return props.addresses.list.map(i => {
            if (i !== null) {
                return <Col key={i._id} xs={24} sm={24} md={12}>
                    <Card hoverable>
                        <Meta
                            title={i.name}
                            description={i.address}
                        />
                    </Card>
                </Col>
            }
            return null
        })
    }

    return renderList()
}

const mapStateToProps = (state) => ({
    addresses: state.addresses
})

const connected = connect(mapStateToProps)(AddressList)

export default connected