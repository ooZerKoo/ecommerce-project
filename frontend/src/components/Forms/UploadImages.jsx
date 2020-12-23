import React from 'react'
import { connect } from 'react-redux'

import { Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { setImagesData } from '../../services/redux/actions/vendor/product'
import { apiDeleteImageProduct } from '../../services/api/vendor/product'

const UploadImages = props => {

    const baseUrl = process.env.REACT_APP_API_PROTOCOL + process.env.REACT_APP_API_URL
    const uploadsUrls = baseUrl + process.env.REACT_APP_VENDOR_ROUTE + process.env.REACT_APP_PRODUCT_ROUTE + '/upload/' + props.idProduct
    const userToken = localStorage.getItem('userToken')

    const images = []
    if (props.product.images) {
        props.product.images.map((value) => (
            typeof (value) !== 'object' ?
                images.push({
                    uid: value,
                    name: props.product.name,
                    status: 'done',
                    url: baseUrl + '/statics/product/' + value,
                }) :
                images.push(value)
        ))
    }

    const propsImages = {
        accept: 'image/*',
        name: 'product',
        multiple: true,
        action: uploadsUrls,
        headers: {
            Authorization: 'Bearer ' + userToken,
        },
        onChange: (info) => {
            props.setImagesData(info.fileList)
            const { status } = info.file
            const m = info.file.name + ' | ' + info.file.response
            console.log(status);
            if (status === 'done') message.success(m)
            if (status === 'error') message.error(m)
            if (status === 'removed') message.success(m)
        },
        onRemove: (data) => apiDeleteImageProduct(props.idProduct, data.uid)
    };

    return (
        <Upload
            {...propsImages}
            listType="picture-card"
            fileList={images}
        >
            <div style={{ width: '100%' }}>
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            </div>
        </Upload>
    )
}

const mapStateToProps = (state, extra) => ({
    idProduct: extra.idProduct,
    product: state.product
})

const mapDispatchToProps = (dispatch) => ({
    setImagesData: (list) => setImagesData(dispatch, list),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadImages)

export default connected