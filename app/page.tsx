import { redirect } from 'next/navigation'
export default function page() {
  redirect("/home")
  return (
    <div className="text-center text-8xl text-white">
      WELCOME TO TWITTER
    </div >
  )
}
