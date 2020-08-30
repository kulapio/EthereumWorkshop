import React from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { useWeb3 } from './hooks/useWeb3'

export const App = () => {
  useWeb3()
  return (
    <div>
      <Header />
      <Footer />
    </div>
  )
}
