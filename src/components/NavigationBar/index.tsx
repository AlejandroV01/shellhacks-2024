/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '../ModeToggle'
const NavigationBar = () => {
  return (
    <nav className='absolute top-4 px-4 flex justify-between w-full z-10'>
      <Link className='flex items-center gap-1 ' href={'/'}>
        <img src='/images/Logo.png' alt='' className='w-[50px]' />
        <span>GPT Teacher</span>
      </Link>
      <ModeToggle />
    </nav>
  )
}

export default NavigationBar