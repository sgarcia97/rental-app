import type { Metadata } from 'next'
import TemplateTenant from '@/components/template-tenant'
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: 'capstone',
  description: 'secure-home',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TemplateTenant>{children}</TemplateTenant>
  )
}