"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabaseClient"

export default function EvidenceDetailPage({ params }: { params: { id: string } }) {
  const [evidence, setEvidence] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvidence() {
      const { data, error } = await supabase
        .from("evidences")
        .select("*")
        .eq("id", params.id)
        .single()

      if (error) {
        console.error("Error fetching evidence:", error)
      } else {
        setEvidence(data)
      }
      setLoading(false)
    }
    fetchEvidence()
  }, [params.id])

  const exportEvidenceReport = () => {
    if (!evidence) return
    const headers = ["ID", "Name", "Type", "Date Added", "Hash", "Description", "Access Log"]
    // Create a string for access log by joining each record with a separator.
    const accessLogStr =
      evidence.accessLog && Array.isArray(evidence.accessLog)
        ? evidence.accessLog.map((log: any) => `${log.user} - ${log.action} - ${log.timestamp}`).join(" | ")
        : ""
    const row = [
      evidence.id,
      `"${evidence.name}"`,
      `"${evidence.type}"`,
      `"${evidence.created_at ? new Date(evidence.created_at).toLocaleString() : "N/A"}"`,
      `"${evidence.hash}"`,
      `"${evidence.description}"`,
      `"${accessLogStr}"`
    ].join(",")
    const csvContent = [headers.join(","), row].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("hidden", "")
    a.setAttribute("href", url)
    a.setAttribute("download", `evidence_${evidence.id}_report.csv`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  if (loading) return <div>Loading...</div>
  if (!evidence) return <div>Evidence not found</div>

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Evidence Details: {evidence.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <strong>Type:</strong> {evidence.type}
            </div>
            <div>
              <strong>Date Added:</strong>{" "}
              {evidence.created_at ? new Date(evidence.created_at).toLocaleString() : "N/A"}
            </div>
            <div>
              <strong>Hash:</strong> {evidence.hash}
            </div>
            <div>
              <strong>Description:</strong> {evidence.description}
            </div>
            {evidence.accessLog && Array.isArray(evidence.accessLog) && (
              <div>
                <strong>Access Log:</strong>
                <ul className="list-disc pl-5">
                  {evidence.accessLog.map((log: any, index: number) => (
                    <li key={index}>
                      {log.user} - {log.action} - {log.timestamp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 flex gap-4">
        <Button asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
        <Button variant="secondary" onClick={exportEvidenceReport}>
          Report
        </Button>
      </div>
    </div>
  )
}
