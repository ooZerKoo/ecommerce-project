import React from 'react'
import { connect } from 'react-redux'

import { Pagination } from 'antd'
import { updatePaginationCategory } from '../../services/redux/actions/category'

const PaginationCategory = props => {
    return (
        <Pagination
            hideOnSinglePage={true}
            defaultCurrent={props.pagination.page}
            current={props.pagination.page}
            total={props.pagination.total}
            pageSizeOptions={[12, 24, 48, 60]}
            pageSize={props.pagination.limit}
            onChange={(page, pageSize) => props.changePage(page, pageSize, props.idCategory)}
        />
    )
}

const mapSateToProps = (state, extra) => ({
    pagination: state.pagination,
    idCategory: extra.idCategory,
})

const mapDispatchToProps = dispatch => ({
    changePage: (page, pageSize, idCategory) => updatePaginationCategory(page, pageSize, idCategory)(dispatch)
})

const connected = connect(mapSateToProps, mapDispatchToProps)(PaginationCategory)

export default connected