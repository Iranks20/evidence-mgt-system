"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/lib/supabaseClient"

export default function DashboardPage() {
  const router = useRouter()
  const [evidenceItems, setEvidenceItems] = useState([])
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (!storedUsername) {
      // If no username found in localStorage, redirect to login page.
      router.push("/")
    } else {
      setUsername(storedUsername)
      // Fetch evidence only if a username is present.
      async function fetchEvidence() {
        const { data, error } = await supabase
          .from("evidences")
          .select("*")
        if (error) {
          console.error("Error fetching evidences:", error)
        } else {
          setEvidenceItems(data)
        }
      }
      fetchEvidence()
    }
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  // Export evidences as a CSV file.
  const exportEvidence = () => {
    if (!evidenceItems || evidenceItems.length === 0) return
    const csvRows = []
    const headers = ["ID", "Name", "Type", "Date Added", "Hash"]
    csvRows.push(headers.join(","))

    evidenceItems.forEach(item => {
      const dateAdded = item.created_at ? new Date(item.created_at).toLocaleDateString() : ""
      const row = [
        item.id,
        `"${item.name}"`,
        `"${item.type}"`,
        `"${dateAdded}"`,
        `"${item.hash}"`
      ].join(",")
      csvRows.push(row)
    })

    const csvString = csvRows.join("\n")
    const blob = new Blob([csvString], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("hidden", "")
    a.setAttribute("href", url)
    a.setAttribute("download", "evidence_report.csv")
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="container mx-auto p-4">
      {/* Responsive Welcome Card with Logout Button */}
      <div className="mb-6">
        <Card className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <CardTitle className="text-3xl font-bold">Welcome, {username}!</CardTitle>
              <CardDescription className="text-xl">
                Welcome to your Evidence Management System Dashboard
              </CardDescription>
            </div>
            <Button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-4 md:mt-0"
            >
              Logout
            </Button>
          </div>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Evidence Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Hash</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evidenceItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    {item.created_at ? new Date(item.created_at).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell>{item.hash}</TableCell>
                  <TableCell>
                    <Button asChild variant="link">
                      <Link href={`/evidence/${item.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-4">
        <Button asChild>
          <Link href="/upload">Upload New Evidence</Link>
        </Button>
        <Button variant="secondary" onClick={exportEvidence}>
          Report
        </Button>
      </div>
    </div>
  )
}
