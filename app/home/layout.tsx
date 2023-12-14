import Dashboard from './dashboard'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Dashboard />
        <div className="ml-[25%]">
          {children}
        </div>
      </body>
    </html >
  )
}
