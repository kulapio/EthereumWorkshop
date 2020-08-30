import React from 'react'

import { useWeb3 } from './hooks/useWeb3'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Account } from './components/Account'

export const App = () => {
  useWeb3()
  return (
    <div>
      <Header />
      <Account />
      <Footer />
    </div>
  )
}
