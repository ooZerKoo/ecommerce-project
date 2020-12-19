import React from 'react'
import { connect } from 'react-redux'

const Home = props => {
    return <h1>Home</h1>
}

const mapStateToProps = state => ({
})

const connected = connect(mapStateToProps)(Home)

export default connected