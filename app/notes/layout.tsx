import React from 'react'
import Navigation from './_components/Navigation'
// import NotesHeader from './_components/Header'

export default function layout(
    { children }: {
        children: React.ReactNode
    }
) {
  return (
    <div className='h-full flex dark:bg-[#1F1F1F]'>
      <Navigation />
      {/* <NotesHeader/>
         */}
        {children}
    </div>
  )
}
