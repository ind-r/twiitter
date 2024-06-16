import Link from 'next/link'
import DashboardProfile from './dashboard-profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faGear } from '@fortawesome/free-solid-svg-icons'
import DashboardDropdown from './dashboard-dropdown'


export default function Dashboard() {
  return (
    <nav className="flex w-full md:w-1/4 xl:w-1/5 p-4 md:border-r border-borderGray md:h-full md:flex-col flex-row">

      <Link href="/home" className="text-white text-2xl pl-0 p-3 ml-10 md:pt-10 md:pb-20">
        <p className=" font-extrabold lg:inline">TWITTER</p>
      </Link>

      <Link href="/home" className=" hidden md:block text-white text-2xl pl-0 p-3 ml-10">
        <FontAwesomeIcon color="white" className="float-left pr-3" icon={faHouse} />
        <p className="hidden lg:block">Home</p>
      </Link>
      <Link href="/settings" className=" hidden md:block text-white text-2xl pl-0 p-3 ml-10">
        <FontAwesomeIcon color="white" className="float-left pr-3" icon={faGear} />
        <p className="hidden lg:block">Settings</p>
      </Link>

      <DashboardProfile />
      <DashboardDropdown />
    </nav>
  )
}
