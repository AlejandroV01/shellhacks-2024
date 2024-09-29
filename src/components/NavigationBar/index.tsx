/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { ModeToggle } from '../ModeToggle'
import { Button } from '../ui/button'
const NavigationBar = () => {
  return (
    <nav className='absolute top-4 right-4 w-fit z-10'>
      <div></div>
      <div className='flex items-center gap-5'>
        <Link href='/about' className='font-semibold'>
          <Button variant={'ghost'}>About the Project</Button>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  )
}

export default NavigationBar
