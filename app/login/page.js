import { redirect } from "next/navigation"

export default function Home() {
  redirect(`${process.env.NEXT_HOME_URL}/login`)
  return null
}