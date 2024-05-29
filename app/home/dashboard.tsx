import Link from 'next/link'
import DashboardProfile from './dashboard-profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
  return (
    <div className="absolute w-[25%] h-screen flex flex-row">
      <div className="h-screen basis-2/6"></div>
      <div className="h-screen basis-full flex flex-col">
        <div className="text-white text-3xl pb-20 pt-10">
          TWITTER
          <FontAwesomeIcon color="white" className="float-left pr-3" icon={faX} />
        </div>

        <Link href="/home" className="text-white text-2xl pl-0 p-3 ml-10">
          <FontAwesomeIcon color="white" className="float-left pr-3" icon={faHouse} />
          <p>Home</p>
        </Link>

        <DashboardProfile />
      </div>
      <div className="h-screen w-[1px] bg-gray-800 items-end"></div>
    </div >
  )
}
