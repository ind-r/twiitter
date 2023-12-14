import Link from 'next/link'
import DashboardProfile from './dashboard-profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
  return (
    <div className="absolute w-[25%] h-screen flex flex-row">
      <div className="h-screen basis-2/6"></div>
      <div className="h-screen basis-full flex flex-col">
        <div className="text-white text-3xl pb-20 pt-10">
          TWIITER (REAL)
        </div>
        <div>
          <FontAwesomeIcon color="white" className="float-left" icon={faHouse} />
          <div className="text-white text-2xl pl-0 p-3 ml-10">
            <Link
              href="/"
            >Home</Link>
          </div>
        </div>
        <div>
          <FontAwesomeIcon color="white" className="float-left" icon={faMagnifyingGlass} />
          <div className="text-white text-2xl pl-0 p-3 ml-10">
            <Link
              href="/"
            >Explore</Link>
          </div>
        </div>
        <div>
          <FontAwesomeIcon color="white" className="float-left" icon={faEnvelope} />

          <div className="text-white text-2xl pl-0 p-3 ml-10">
            <Link
              href="/"
            >Notifications</Link>
          </div>
        </div>
        <div>
          <FontAwesomeIcon color="white" className="float-left" icon={faBell} />
          <div className="text-white text-2xl pl-0 p-3 ml-10">
            <Link
              href="/"
            >Messages</Link>
          </div>
        </div>
        <div>
          <FontAwesomeIcon color="white" className="float-left" icon={faList} />
          <div className="text-white text-2xl pl-0 p-3 ml-10">
            <Link
              href="/"
            >Lists</Link>
          </div>
        </div>
        <div>
          <FontAwesomeIcon color="white" className="float-left" icon={faBookmark} />
          <div className="text-white text-2xl pl-0 p-3 ml-10">
            <Link
              href="/"
            >Bookmarks</Link>
          </div>
        </div>
        <div>
          <FontAwesomeIcon color="white" className="float-left" icon={faUserGroup} />
          <div className="text-white text-2xl pl-0 p-3 ml-10">
            <Link
              href="/"
            >Communities</Link>
          </div>
        </div>
        <div>
          <FontAwesomeIcon color="white" className="float-left" icon={faX} />
          <div className="text-white text-2xl pl-0 p-3 ml-10">
            <Link
              href="/"
            >Premium</Link>
          </div>
        </div>
        <div>
          <FontAwesomeIcon color="white" className="float-left" icon={faUser} />
          <div className="text-white text-2xl pl-0 p-3 ml-10">
            <Link
              href="/"
            >Profile</Link>
          </div>
        </div>
        <div>
          <FontAwesomeIcon color="white" className="float-left" icon={faEllipsis} />
          <div className="text-white text-2xl pl-0 p-3 ml-10">
            <Link
              href="/"
            >More</Link>
          </div>
        </div>
        <DashboardProfile />
      </div>
      <div className="h-screen w-[1px] bg-gray-800 items-end"></div>
    </div>
  )
}
