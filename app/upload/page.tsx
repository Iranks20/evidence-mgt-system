"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabaseClient"

export default function UploadPage() {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const evidenceName = formData.get("evidenceName") as string
    const evidenceType = formData.get("evidenceType") as string
    const description = formData.get("description") as string

    const hash = crypto.randomUUID()

    const { data, error } = await supabase
      .from("evidences")
      .insert([
        {
          name: evidenceName,
          type: evidenceType,
          description: description,
          hash: hash,
        },
      ])

    if (error) {
      console.error("Error inserting record:", error)
      return
    }
    console.log("Evidence inserted successfully:", data)
    router.push("/dashboard")
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Upload New Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="evidenceName">Evidence Name</Label>
              <Input id="evidenceName" name="evidenceName" placeholder="Enter evidence name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="evidenceType">Evidence Type</Label>
              <Input id="evidenceType" name="evidenceType" placeholder="e.g., Disk Image, Log File" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Enter a description of the evidence" />
            </div>
            <Button type="submit">Upload Evidence</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
