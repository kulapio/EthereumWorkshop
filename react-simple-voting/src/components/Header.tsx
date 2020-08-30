import React from 'react'
import { ContractAddress } from './ContractAddress'
import { NetworkIndicator } from './NetworkIndicator'

export const Header = () => {
  return (
    <>
      <header
        className="w-full m-0 px-16 py-32 bg-cover bg-no-repeat bg-top font-sans relative flex flex-col justify-start"
        style={{
          backgroundColor: '#F8643F',
          minHeight: '100vh',
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-top"
          style={{
            backgroundImage: 'url(./images/unsplash-voting-bg.jpg)',
          }}
        />
        <div
          className="text-6xl text-white font-bold center bg-indigo-900 py-2 pl-16 pr-6 inline-block tracking-wide relative overflow-hidden z-20"
          style={{ marginLeft: '-4rem' }}
        >
          <span>VOTING</span>
          <span className="font-light text-3xl ml-2">via BLOCKCHAIN</span>
        </div>
        <div className="z-20 flex justify-center">
          <ContractAddress />
        </div>
      </header>
      <NetworkIndicator />
    </>
  )
}
