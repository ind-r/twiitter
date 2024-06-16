import { Input } from "@/components/ui/input"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function LeftMenu() {
  return (
    <>
      <div className="h-full flex flex-col pt-2">
        <div>
          <Input
            className="rounded-xl"
            placeholder="Search"
          />

        </div>
        <div className="border border-borderGray rounded-lg mt-5 p-4">
        <h1 className="font-bold text-xl">Trends for you</h1>
        </div>
      </div>
    </>
  )
}
