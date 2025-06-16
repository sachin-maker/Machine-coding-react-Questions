import React from 'react'
import ProductList from './components/ProductList'
import './style.css'

const InfiniteScroll = () => {
  return (
    <div className="home">
      <h2 style={{ textAlign: 'center' }}>Infinite Scroll with Virtualization</h2>
      <ProductList />
    </div>
  )
}

export default InfiniteScroll