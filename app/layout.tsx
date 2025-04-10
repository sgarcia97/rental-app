import type { Metadata } from 'next'
import { AuthContextProvider } from '../utils/supabase/context'
import './globals.css'

export const metadata: Metadata = {
  title: 'capstone',
  description: 'secure-home',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{<AuthContextProvider>{children}</AuthContextProvider>}</body>
    </html>
  )
}
