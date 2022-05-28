import React from 'react'
import { Footer } from '../components/Footer'
import Header from '../components/Header'

const UnRequireAuth = ({ children }) => {
  return (
    <>
    <Header />
    <div>{children}</div>
    <Footer />
  </>
  )
}

export default UnRequireAuth