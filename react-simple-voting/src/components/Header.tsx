import React from 'react'
import { ContractAddress } from './ContractAddress'

export const Header = () => {
  return (
    <header
      className="w-full m-0 px-16 py-32 bg-cover bg-no-repeat bg-top font-sans relative flex flex-col justify-start"
      style={{
        backgroundImage: 'url(./images/unsplash-voting-bg.jpg)',
        backgroundColor: '#F8643F',
        height: '100vh',
        minHeight: '700px',
      }}
    >
      {/* <div className="absolute left-0 top-0 w-full h-full bg-black opacity-25" /> */}
      <div
        className="text-6xl text-white font-bold center bg-indigo-900 py-2 pl-16 pr-6 inline-block tracking-wide relative overflow-hidden"
        style={{ marginLeft: '-4rem' }}
      >
        <span>VOTING</span>
        <span className="font-light text-3xl ml-2">via BLOCKCHAIN</span>
      </div>
      <ContractAddress />
    </header>
  )
}
