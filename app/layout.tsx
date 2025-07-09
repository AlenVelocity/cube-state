import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Every Rubiks Cube State',
  description: 'Every Rubiks Cube State',
  generator: 'Every Rubiks Cube State',
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
