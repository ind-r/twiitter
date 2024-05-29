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
        {children}
      </div>
    </div>
  )
}
