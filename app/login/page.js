import { redirect } from "next/navigation"

export default function Login() {
  redirect(`${process.env.NEXT_HOME_URL}/login`)
  return null
}