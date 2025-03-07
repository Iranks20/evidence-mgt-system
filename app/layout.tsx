import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brian Research Evidence System',
  description: "A robust digital evidence management system tailored for Brian's research in BCFCI.",
  generator: 'Brian Research',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
