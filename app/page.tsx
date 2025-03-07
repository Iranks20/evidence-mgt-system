"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const { data, error: loginError } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single()

    if (loginError || !data) {
      console.error("Error logging in:", loginError)
      setError("Invalid credentials")
      return
    }

    localStorage.setItem("username", data.username)
    localStorage.setItem("email", data.email)

    router.push("/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>E-Evidence Management System</CardTitle>
          <CardDescription>Login to access the digital forensics platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="Enter your username" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Enter your password" required />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
