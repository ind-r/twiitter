import Dashboard from './dashboard'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap justify-center md:flex-nowrap ">
      <div className="hidden md:block w-64 md:w-1/4 xl:w-1/5 p-4 border-r border-gray-800">
        <Dashboard />
      </div>
      <div className="md:max-w-[600px] w-full md:w-3/4 xl:w-3/5 border-r border-gray-800 overflow-y-scroll h-screen no-scrollbar">
        {children}
      </div>
      <div className="hidden md:block w-64 md:w-1/4 xl:w-3/12 p-4">
      </div>
    </div>
  )
}
