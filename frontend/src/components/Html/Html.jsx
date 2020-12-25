import React from 'react'
import { connect } from 'react-redux'

const Html = props => {
    return <div dangerouslySetInnerHTML={{ __html: props.html }}></div>
}

const mapStateToProps = (state, extra) => ({
    html: extra.html
})

const connected = connect(mapStateToProps, null)(Html)

export default connected