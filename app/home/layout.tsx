import Dashboard from './dashboard'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Dashboard />
      <div className="ml-[25%]">
        {children}
      </div>
    </div>
  )
}
