import Dashboard from './dashboard'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Dashboard />
      <div className="pl-[25%] flex flex-col pr-[30%] h-screen overflow-y-scroll" id="feed">
        <div className="absolute right-0 h-screen w-[30%] flex flex-row">
          <div className="h-screen w-[1px] bg-gray-800 items-start"></div>
          <div className="h-screen basis-full flex flex-col items-center">
            <h1 className="text-white text-3xl">/</h1>
          </div>
        </div>
        <div className="absolute left-[25%] w-[45%] top-0 pt-14 opacity-50 blur-md bg-black">
          <div className="h-[1px] w-full bg-gray-800 items-start"></div>
        </div>
        {children}
      </div>
    </div>
  )
}
