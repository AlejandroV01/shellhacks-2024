/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { ModeToggle } from '../ModeToggle'
const NavigationBar = () => {
  return (
    <nav className='absolute top-4 right-4 w-fit z-10'>
      <div></div>
      <div className='flex items-center gap-5'>
        <Link href='/about' className='font-semibold'>
          About the Project
        </Link>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default NavigationBar
