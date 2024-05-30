import Link from 'next/link'
import DashboardProfile from './dashboard-profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
  return (
    <nav className="h-full flex flex-row">
      <div className="h-full basis-full flex flex-col pb-20">
        <Link href="/home" className="text-white text-2xl pl-0 p-3 ml-10 pt-10 pb-20">
          <p className=" font-extrabold lg:inline">TWITTER</p>
        </Link>

        <Link href="/home" className="text-white text-2xl pl-0 p-3 ml-10">
          <FontAwesomeIcon color="white" className="float-left pr-3" icon={faHouse} />
          <p className="hidden lg:block">Home</p>
        </Link>

        <DashboardProfile />
      </div>
    </nav >
  )
}
